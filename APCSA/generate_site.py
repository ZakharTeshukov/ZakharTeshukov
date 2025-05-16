import os
from pathlib import Path
import re
import shutil
import markdown # Added for Markdown processing

# --- Configuration ---
CONFIG = {
    "workspace_root": Path(__file__).parent.resolve(),
    "html_dir_name": "html",
    "output_dir_name": "html", # Where generated files will go, relative to workspace_root
    "index_stylesheet": "custom_styles/index_styles.css",
    "view_all_stylesheet": "custom_styles/unit_review_styles.css",
    "darkmode_js": "darkmode.js",
    "search_js": "search.js",
    "pagination_js": "pagination.js",
    "max_items_on_index": 10, # For pagination.js to use, but index.html will list all
    "site_title_prefix": "AP CSA Resources",
    "sections_definition": [
        {
            "group_title": "Study Materials",
            "cards": [
                {
                    "card_title": "Unit Review Guides",
                    "list_id": "review-guides-list",
                    "item_type_class": "unit-list",
                    "items_source_type": "unit_review_guides", # Special handler
                    "view_all_page_name": "view-all-review-guides.html",
                    "view_all_button_id": "view-all-review-guides-btn",
                    "view_all_button_text": "View All Review Guides",
                    "view_all_title": "All Unit Review Guides"
                },
                {
                    "card_title": "Practice FRQs (Files)",
                    "list_id": "practice-frqs-list",
                    "item_type_class": "unit-list",
                    "items_source_type": "scan_dir",
                    "source_args": {"sub_dir": "practiceFRQs", "glob_pattern": "*.java", "href_prefix": "../practiceFRQs/"},
                    "view_all_page_name": "view-all-practice-frqs-files.html",
                    "view_all_button_id": "view-all-practice-frqs-btn",
                    "view_all_button_text": "View All Practice FRQs (Files)",
                    "view_all_title": "All Practice FRQs (Files)"
                },
                {
                    "card_title": "Practice Projects (Files)",
                    "list_id": "practice-projects-list",
                    "item_type_class": "unit-list",
                    "items_source_type": "scan_dir",
                    "source_args": {"sub_dir": "practiceProjects", "glob_pattern": "*.java", "href_prefix": "../practiceProjects/"},
                    "view_all_page_name": "view-all-practice-projects-files.html",
                    "view_all_button_id": "view-all-practice-projects-btn",
                    "view_all_button_text": "View All Practice Projects (Files)",
                    "view_all_title": "All Practice Projects (Files)"
                }
            ]
        },
        {
            "group_title": "Additional Resources",
            "cards": [
                {
                    "card_title": "FRQ Rubric",
                    "list_id": "frq-rubric-list",
                    "item_type_class": "folder-contents",
                    "items_source_type": "markdown_files",
                    "source_args": {
                        "sub_dir": "FRQRubric", 
                        "glob_pattern": "*.md",
                        "output_subdir_name": "frq_rubrics_rendered"
                    },
                    "view_all_page_name": "view-all-frq-rubrics.html",
                    "view_all_button_id": "view-all-frq-rubric-btn",
                    "view_all_button_text": "View All FRQ Rubrics",
                    "view_all_title": "All FRQ Rubric Documents"
                },
                {
                    "card_title": "College Board Materials",
                    "list_id": "college-board-materials-list",
                    "item_type_class": "folder-contents",
                    "items_source_type": "scan_dir",
                    "source_args": {"sub_dir": "collegeBoardMeterials", "glob_pattern": "*.*", "href_prefix": "../collegeBoardMeterials/"},
                    "view_all_page_name": "view-all-college-board-materials.html",
                    "view_all_button_id": "view-all-college-board-materials-btn",
                    "view_all_button_text": "View All College Board Materials",
                    "view_all_title": "All College Board Materials"
                },
                {
                    "card_title": "Review Materials (from reviewMaterials)",
                    "list_id": "review-materials-list",
                    "item_type_class": "folder-contents",
                    "items_source_type": "scan_dir",
                    "source_args": {"sub_dir": "reviewMaterials", "glob_pattern": "*.*", "href_prefix": "../reviewMaterials/"},
                    "view_all_page_name": "view-all-review-materials.html",
                    "view_all_button_id": "view-all-review-materials-btn",
                    "view_all_button_text": "View All Review Materials",
                    "view_all_title": "All Review Materials"
                }
            ]
        }
    ]
}

# --- Helper Functions ---
def generate_link_text(name_str, source_path_obj=None):
    name = Path(name_str).stem.replace('-', ' ').replace('_', ' ')
    
    # Attempt to get title from HTML files for unit review guides
    if source_path_obj and source_path_obj.name.startswith("Unit-") and source_path_obj.name.endswith("-Review-Guide.html"):
        try:
            content = source_path_obj.read_text(encoding='utf-8', errors='ignore')
            title_match = re.search(r"<title>(.*?)</title>", content, re.IGNORECASE)
            if title_match:
                # Use the title from HTML, but clean it up if it's just the filename
                raw_title = title_match.group(1).strip()
                # Check if title is just a variation of filename (e.g. "Unit-1-Review-Guide")
                if raw_title.replace(' ','-').replace(':','').lower() != source_path_obj.stem.lower():
                    # A more descriptive title was likely found
                    # Try to extract unit number and a better name part
                    parts = source_path_obj.stem.split('-') # Unit-X-Review-Guide
                    if len(parts) > 1 and parts[0].lower() == "unit" and parts[1].isdigit():
                        unit_num = parts[1]
                        # Assume original index.html had "Unit X: Topic"
                        # This part is tricky to generalize if title tag is not consistent
                        # Fallback to filename based if title is not good enough
                        # For now, we'll prefer a simple title if found, else filename-based
                        # This part needs very specific title patterns from the actual files.
                        # Example: <title>Unit 1: Primitive Types</title>
                        title_parts = raw_title.split(':')
                        if len(title_parts) > 1 and title_parts[0].lower().strip() == f"unit {unit_num}":
                            return raw_title # Looks like "Unit X: Topic"
                        # If title is just "Unit-1-Review-Guide", generate_link_text will handle it
                        
        except Exception:
            pass # Fallback to filename processing

    # Specific for Unit-X-Review-Guide.html if title parsing failed or wasn't applicable
    if name_str.startswith("Unit-") and name_str.endswith("-Review-Guide.html"):
        parts = Path(name_str).stem.split('-') # Unit-X-Review-Guide
        if len(parts) > 1 and parts[0].lower() == "unit" and parts[1].isdigit():
            topic = " ".join(p.capitalize() for p in parts[2:-1]) # "Review Guide" part
            return f"Unit {parts[1]}: {topic if topic else 'Overview'}"


    match = re.match(r"unit (\d+) (.*)", name, re.IGNORECASE)
    if match:
        unit_num = match.group(1)
        rest_of_name = match.group(2).strip()
        # Capitalize words in the rest_of_name
        processed_rest = ' '.join(word.capitalize() for word in rest_of_name.split())
        return f"Unit {unit_num}: {processed_rest}" if processed_rest else f"Unit {unit_num}"

    if Path(name_str).suffix.lower() == ".java":
        return Path(name_str).name # Keep full name for .java files

    return ' '.join(word.capitalize() for word in name.split())


def get_unit_review_guides_data(html_dir):
    items = []
    # Regex to match Unit-X-Review-Guide.html specifically
    unit_guide_pattern = re.compile(r"Unit-(\d+)-Review-Guide\.html", re.IGNORECASE)
    
    found_files = sorted([p for p in html_dir.iterdir() if unit_guide_pattern.match(p.name)], 
                         key=lambda p: int(unit_guide_pattern.match(p.name).group(1)))

    for p_html in found_files:
        link_text = generate_link_text(p_html.name, source_path_obj=p_html)
        items.append({"href": p_html.name, "text": link_text, "filepath": str(p_html)})
    return items

def scan_directory_data(base_dir, sub_dir, glob_pattern, href_prefix, exclude_pattern=None):
    items = []
    source_path = base_dir / sub_dir
    if source_path.is_dir():
        file_list = sorted(source_path.glob(glob_pattern))
        if exclude_pattern:
            file_list = [f for f in file_list if not re.match(exclude_pattern, f.name, re.IGNORECASE)]
            
        for p_file in file_list:
            link_text = generate_link_text(p_file.name, source_path_obj=p_file)
            items.append({"href": f"{href_prefix}{p_file.name}", "text": link_text, "filepath": str(p_file)})
    return items

# --- HTML Generation Functions ---
def generate_item_list_html(items, item_type_class, list_id):
    if not items:
        return f'<div class="{item_type_class}" id="{list_id}"><p>No items found.</p></div>'
    
    list_items_html = "".join([
        f'                        <a href="{item["href"]}">{item["text"]}</a>\n'
        for item in items
    ])
    return f'''                    <div class="{item_type_class}" id="{list_id}">
{list_items_html.rstrip()}
                    </div>'''

def generate_view_all_button_html(button_id, button_text):
    return f'                    <a href="#" class="view-all-button" id="{button_id}" style="display:none;">{button_text}</a>'

def generate_index_html(cfg, all_sections_data):
    html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{cfg['site_title_prefix']}</title>
    <link rel="stylesheet" href="{cfg['index_stylesheet']}">
</head>
<body>
    <nav class="navbar">
        <a href="index.html" class="navbar-brand">{cfg['site_title_prefix']}</a>
        <button class="theme-toggle">Toggle Mode</button>
    </nav>

    <h1>{cfg['site_title_prefix']}</h1>

    <div class="search-container">
        <input type="text" id="search-bar" placeholder="Search resources...">
    </div>
    
    <div class="resources-container">
"""
    for section_group in cfg["sections_definition"]:
        html_content += f"        <!-- {section_group['group_title']} Section -->\n"
        html_content += f"        <section class=\"resource-section\">\n"
        html_content += f"            <h2>{section_group['group_title']}</h2>\n"
        html_content += f"            <div class=\"resource-grid\">\n"
        for card_def in section_group["cards"]:
            items = all_sections_data[card_def["list_id"]]
            list_html = generate_item_list_html(items, card_def["item_type_class"], card_def["list_id"])
            button_html = generate_view_all_button_html(card_def["view_all_button_id"], card_def["view_all_button_text"])
            
            html_content += f"""                <div class="resource-card">
                    <h3>{card_def['card_title']}</h3>
{list_html}
{button_html}
                </div>
"""
        html_content += f"            </div>\n"
        html_content += f"        </section>\n\n"

    html_content += f"""    </div>

    <script src="{cfg['darkmode_js']}"></script>
    <script src="{cfg['search_js']}"></script>
    <script src="{cfg['pagination_js']}"></script> 
</body>
</html>
"""
    return html_content

def generate_view_all_page_html(cfg, page_title, items, page_name):
    list_items_html = ""
    if items:
        list_items_html = "".join([
            f'            <li><a href="{item["href"]}">{item["text"]}</a></li>\n'
            for item in items
        ])
    else:
        list_items_html = "            <li><p>No items found for this section.</p></li>"

    # Note: The original view-all pages had embedded CSS and JS for dark mode.
    # It's better to link to the common darkmode.js and unit_review_styles.css
    html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{page_title} - {cfg['site_title_prefix']}</title>
    <link rel="stylesheet" href="{cfg['view_all_stylesheet']}">
    <style>
        /* Minor adjustments if unit_review_styles.css is not enough */
        body {{ padding-top: 70px; /* Adjust if navbar height changes */ }}
        .content-container {{ max-width: 800px; margin: 2rem auto; padding: 0 1rem; }}
        .item-list {{ list-style-type: none; padding-left: 0; }}
        .item-list li {{ margin-bottom: 0.75rem; }}
        .item-list a {{ 
            text-decoration: none; color: var(--heading-color); font-size: 1.1rem;
            display: block; padding: 0.5rem; border-radius: 4px;
            transition: background-color 0.2s ease;
        }}
        .item-list a:hover {{ background-color: var(--table-hover); color: var(--text-color); }}
        .back-link {{ display: inline-block; margin-bottom: 1.5rem; color: var(--heading-color); text-decoration: none; font-weight: bold; }}
        .back-link:hover {{ text-decoration: underline; }}
    </style>
</head>
<body>
    <nav class="navbar">
        <a href="index.html" class="navbar-brand">{cfg['site_title_prefix']} Home</a>
        <button class="theme-toggle">Toggle Mode</button>
    </nav>

    <div class="content-container">
        <a href="index.html" class="back-link">&larr; Back to Main Page</a>
        <h1>{page_title}</h1>
        <ul class="item-list">
{list_items_html.rstrip()}
        </ul>
    </div>

    <script src="{cfg['darkmode_js']}"></script>
</body>
</html>
"""
    return html_content

# --- New Function for Single Rendered Markdown Page ---
def generate_single_markdown_page_html(cfg, page_title, markdown_html_content, breadcrumb_text="Back to Rubrics"):
    # Determine path to view_all_stylesheet relative to this new page
    # If markdown pages are in a subfolder like 'frq_rubrics_rendered/', css path is '../custom_styles/...'
    # Assuming output_subdir_name implies one level of depth.
    # We need to ensure CSS and JS paths are correct relative to where this HTML file will be saved.
    # If these pages are in output_dir / "frq_rubrics_rendered" / "file.html",
    # and index.html is in output_dir / "index.html",
    # and css is in output_dir / "custom_styles" / "unit_review_styles.css"
    # then the path from the markdown page to css should be "../custom_styles/unit_review_styles.css"
    # and path to darkmode.js should be "../darkmode.js"
    # The view_all_page_name for FRQ Rubrics is 'view-all-frq-rubrics.html'.
    # This link should go back to that page from an individual rubric page.
    # Let's make this dynamic based on where the 'view_all_page_name' is located.
    # For now, let's assume view_all_frq_rubrics.html is at the root of output_dir.

    # The path from e.g. frq_rubrics_rendered/file.html to index.html is ../index.html
    # The path to stylesheet is ../custom_styles/unit_review_styles.css
    # The path to darkmode_js is ../darkmode.js

    html_content = f'''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{page_title} - {cfg['site_title_prefix']}</title>
    <link rel="stylesheet" href="../{cfg['view_all_stylesheet']}">
    <style>
        body {{ padding-top: 70px; }}
        .navbar {{ position: fixed; top: 0; width: 100%; z-index: 1000; }}
        .content-container {{ max-width: 900px; margin: 2rem auto; padding: 20px; background-color: var(--bg-color); color: var(--text-color); border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }}
        .markdown-body h1, .markdown-body h2, .markdown-body h3 {{ color: var(--heading-color); border-bottom: 1px solid var(--table-border); padding-bottom: 0.3em; }}
        .markdown-body table {{ border-collapse: collapse; width: 100%; margin-bottom: 1rem; }}
        .markdown-body th, .markdown-body td {{ border: 1px solid var(--table-border); padding: 0.5rem; text-align: left; }}
        .markdown-body th {{ background-color: var(--table-header-bg); }}
        .markdown-body tr:nth-child(even) {{ background-color: var(--table-even-row-bg); }}
        .markdown-body code {{ background-color: var(--code-bg-color); padding: 0.2em 0.4em; margin: 0; font-size: 85%; border-radius: 3px; }}
        .markdown-body pre {{ background-color: var(--code-bg-color); padding: 1rem; border-radius: 5px; overflow-x: auto; }}
        .markdown-body pre code {{ padding: 0; margin: 0; font-size: inherit; background-color: transparent; }}
        .back-link {{ display: inline-block; margin-bottom: 1.5rem; color: var(--link-color); text-decoration: none; font-weight: bold; }}
        .back-link:hover {{ text-decoration: underline; }}
    </style>
</head>
<body>
    <nav class="navbar">
        <a href="../index.html" class="navbar-brand">{cfg['site_title_prefix']} Home</a>
        <button class="theme-toggle">Toggle Mode</button>
    </nav>

    <div class="content-container">
        <a href="../view-all-frq-rubrics.html" class="back-link">&larr; {breadcrumb_text}</a>
        <div class="markdown-body">
{markdown_html_content}
        </div>
    </div>

    <script src="../{cfg['darkmode_js']}"></script>
</body>
</html>'''
    return html_content

# --- New Data Gathering Function for Markdown Files ---
def process_markdown_directory_data(cfg, workspace_root, output_dir_abs, card_def):
    items = []
    source_path = workspace_root / card_def["source_args"]["sub_dir"]
    output_subdir_name = card_def["source_args"]["output_subdir_name"]
    rendered_output_path = output_dir_abs / output_subdir_name

    if not rendered_output_path.exists():
        rendered_output_path.mkdir(parents=True, exist_ok=True)
        print(f"Created directory for rendered markdown: {rendered_output_path}")

    if source_path.is_dir():
        md_files = sorted(source_path.glob(card_def["source_args"]["glob_pattern"]))
        for md_file_path in md_files:
            try:
                md_content = md_file_path.read_text(encoding='utf-8')
                # Use 'fenced_code' and 'tables' extensions for common Markdown features
                html_from_markdown = markdown.markdown(md_content, extensions=['fenced_code', 'tables', 'sane_lists'])
                
                link_text = generate_link_text(md_file_path.name) # Get a nice name for the link
                page_title = f"{link_text} - {card_def['card_title']}"

                # Generate the full HTML page for this markdown file
                individual_page_html = generate_single_markdown_page_html(
                    cfg,
                    page_title,
                    html_from_markdown,
                    breadcrumb_text=f"Back to {card_def['view_all_title']}"
                )
                
                # Save the rendered HTML page
                rendered_html_filename = f"{md_file_path.stem}.html"
                rendered_html_filepath = rendered_output_path / rendered_html_filename
                rendered_html_filepath.write_text(individual_page_html, encoding='utf-8')
                # print(f"Rendered and saved: {rendered_html_filepath}")

                items.append({
                    "href": f"{output_subdir_name}/{rendered_html_filename}", # Relative to output_dir_abs
                    "text": link_text,
                    "filepath": str(md_file_path) # Original .md file path
                })
            except Exception as e:
                print(f"Error processing markdown file {md_file_path.name}: {e}")
    
    if not items:
        print(f"No markdown files found or processed in {source_path} matching {card_def['source_args']['glob_pattern']}")
    return items

# --- Main Execution ---
def main():
    print("Starting website generation...")
    workspace_root = CONFIG["workspace_root"]
    html_dir_abs = workspace_root / CONFIG["html_dir_name"]
    output_dir_abs = workspace_root / CONFIG["output_dir_name"]

    if not output_dir_abs.exists():
        output_dir_abs.mkdir(parents=True, exist_ok=True)
        print(f"Created output directory: {output_dir_abs}")

    all_sections_data = {}

    # Gather data for all sections
    for section_group in CONFIG["sections_definition"]:
        for card_def in section_group["cards"]:
            items = []
            if card_def["items_source_type"] == "unit_review_guides":
                items = get_unit_review_guides_data(html_dir_abs)
            elif card_def["items_source_type"] == "scan_dir":
                args = card_def["source_args"]
                items = scan_directory_data(
                    workspace_root, 
                    args["sub_dir"], 
                    args["glob_pattern"], 
                    args["href_prefix"],
                    args.get("exclude_pattern")
                )
            elif card_def["items_source_type"] == "markdown_files":
                items = process_markdown_directory_data(
                    CONFIG,
                    workspace_root,
                    output_dir_abs,
                    card_def
                )
            all_sections_data[card_def["list_id"]] = items
            
            # Generate and save "View All" page for this card
            view_all_html = generate_view_all_page_html(
                CONFIG,
                card_def["view_all_title"],
                items,
                card_def["view_all_page_name"]
            )
            view_all_file_path = output_dir_abs / card_def["view_all_page_name"]
            view_all_file_path.write_text(view_all_html, encoding='utf-8')
            print(f"Generated View All page: {view_all_file_path}")


    # Generate and save index.html
    index_html_content = generate_index_html(CONFIG, all_sections_data)
    index_file_path = output_dir_abs / "index.html"
    index_file_path.write_text(index_html_content, encoding='utf-8')
    print(f"Generated Index page: {index_file_path}")
    
    # Ensure JS files are present (darkmode.js, search.js, pagination.js)
    # For this example, we assume they exist. If not, they'd need to be created.
    # The darkmode.js in view-all pages was simplified to use the external script.
    # Make sure the <button class="theme-toggle"> in the templates matches what darkmode.js expects.
    # The original darkmode.js was: onclick="toggleDarkMode()" and button text changes.
    # The new template has <button class="theme-toggle">Toggle Mode</button>. This needs alignment.
    # For simplicity, this script assumes `darkmode.js` handles its button.

    print("Website generation complete.")

if __name__ == "__main__":
    main() 