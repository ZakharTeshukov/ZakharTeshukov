import markdown
import os
import glob
import shutil
import time
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler
from pathlib import Path # Added for robust path manipulation
import re # For replacing navbar in index.html

# Configuration for ignored files and folders
IGNORE_PATTERNS = [
    '.DS_Store', '.git', '.gitignore', '__pycache__', '*.pyc', 
    '*.swp', 'node_modules', '.vscode', 'venv', '.idea',
    # Add the html folder itself to prevent self-listing
    # This will be set dynamically based on script_dir later
]

def scan_project_files(project_root_str, html_dir_name='html'):
    project_root = Path(project_root_str)
    html_dir_path = project_root / html_dir_name
    
    # Add the html_dir_name to IGNORE_PATTERNS dynamically
    current_ignore_patterns = IGNORE_PATTERNS + [html_dir_name]

    def should_ignore(path_obj):
        return any(path_obj.match(pattern) or path_obj.name == pattern for pattern in current_ignore_patterns)

    def build_structure(current_path):
        structure = []
        try:
            for item in sorted(current_path.iterdir(), key=lambda x: (x.is_file(), x.name.lower())):
                if should_ignore(item):
                    continue
                
                # Path relative to the project root, for display and structure
                # Path for href should be relative to html_dir
                # Example: if html_dir is project_root/html, and item is project_root/folder/file.txt
                # The href from inside html_dir should be ../folder/file.txt
                relative_to_html_dir = Path(os.path.relpath(item, html_dir_path))

                if item.is_dir():
                    structure.append({
                        'name': item.name,
                        'type': 'folder',
                        'path': str(relative_to_html_dir),
                        'children': build_structure(item)
                    })
                else:
                    structure.append({
                        'name': item.name,
                        'type': 'file',
                        'path': str(relative_to_html_dir)
                    })
        except PermissionError:
            print(f"Permission denied for {current_path}")
            pass # Or handle more gracefully
        return structure

    return build_structure(project_root)

def create_dynamic_navbar_html(file_structure, site_title="AP CSA Review Guides"):
    nav_links_html = ""

    def generate_links_html(items, is_submenu=False):
        html = f"<ul class='{'dropdown-menu' if is_submenu else 'nav-links'}'>"
        for item in items:
            html += "<li>"
            if item['type'] == 'folder':
                # For folders, create a link that could be non-clickable or to a generated index page
                # For now, let's make the folder name a non-linking part of the dropdown trigger
                # Or, if we want folder names to be links (e.g. to an auto-generated index for that folder):
                # html += f"<a href='{item['path']}'>{item['name']}</a>"
                html += f"<div class='dropdown'><span>{item['name']} <span class='arrow'>&#9662;</span></span>"
                if item['children']:
                    html += generate_links_html(item['children'], True)
                html += "</div>"
            else: # file
                html += f"<a href='{item['path']}'>{item['name']}</a>"
            html += "</li>"
        html += "</ul>"
        return html

    nav_links_html = generate_links_html(file_structure)

    navbar_html = f"""
    <nav class="navbar">
        <a href="index.html" class="navbar-brand">{site_title}</a>
        <button class="mobile-nav-toggle" aria-label="Toggle navigation" aria-expanded="false">
            <span class="hamburger-icon"></span>
        </button>
        <div class="navigation-menu">
            {nav_links_html}
            <button class="theme-toggle" onclick="toggleDarkMode()">Switch to Dark Mode</button>
        </div>
    </nav>
    """
    return navbar_html

class MarkdownHandler(FileSystemEventHandler):
    def __init__(self, project_root_dir, review_guides_sub_dir, html_dir_abs_path):
        self.project_root_dir = project_root_dir
        self.review_guides_dir = os.path.join(project_root_dir, review_guides_sub_dir)
        self.html_dir = html_dir_abs_path # Absolute path to the html output directory
        self.html_dir_name = Path(html_dir_abs_path).name # e.g. "html"
        
        self.regenerate_site_structure_and_navbar()
        self.convert_all_files()
        
    def regenerate_site_structure_and_navbar(self):
        print("Scanning project files and regenerating navbar...")
        file_structure = scan_project_files(self.project_root_dir, self.html_dir_name)
        self.navbar_html = create_dynamic_navbar_html(file_structure)

    def on_any_event(self, event): # Watch all events more broadly for nav regeneration
        if event.is_directory:
            # Could be a new folder or deleted folder, might affect nav
            # Simple approach: regenerate on any directory event for now
            # More complex: track specific folder changes if performance is an issue
            # self.regenerate_site_structure_and_navbar()
            # self.convert_all_files() # Re-convert all as navbar changed
            return 

        # If a non-ignored MD file is modified/created in review_guides_dir
        if event.src_path.startswith(self.review_guides_dir) and event.src_path.endswith('.md'):
            if event.event_type == 'modified' or event.event_type == 'created':
                print(f"\nDetected {event.event_type} in {os.path.basename(event.src_path)}")
                self.convert_file(event.src_path)
        # Add more sophisticated checks if other file types should trigger full rebuild
        # For now, only MD files trigger direct conversion. Full nav rebuild on script start.

    def convert_file(self, md_file_path):
        try:
            convert_md_to_html(md_file_path, self.html_dir, self.navbar_html)
        except Exception as e:
            print(f"Error converting {os.path.basename(md_file_path)}: {e}")
    
    def convert_all_files(self):
        # cleanup_old_html_files(self.review_guides_dir) # Original location - might be wrong if files are in html_dir
        # Assuming cleanup should happen in html_dir for html files *not* corresponding to an md source
        # This part needs careful thought if we are cleaning output dir.
        
        # Update index.html with the current navbar
        update_index_html_navbar(self.html_dir, self.navbar_html)

        md_files = glob.glob(os.path.join(self.review_guides_dir, '*Review-Guide.md'))
        for md_file in md_files:
            self.convert_file(md_file)
        print("\nConversion of Markdown files complete! Watching for changes...")

def convert_md_to_html(md_file_path, output_dir, navbar_html):
    base_name = os.path.basename(md_file_path)
    html_file_name = os.path.splitext(base_name)[0] + '.html'
    html_file_path = os.path.join(output_dir, html_file_name)
    
    with open(md_file_path, 'r', encoding='utf-8') as f:
        md_text = f.read()
    
    md = markdown.Markdown(extensions=['fenced_code', 'codehilite', 'tables', 'toc'])
    html_body = md.convert(md_text)
    toc_html = getattr(md, 'toc', '')

    toc_content_html = ""
    if toc_html:
        if not toc_html.strip().startswith("<ul>") and not "<div class=\"toc\">" in toc_html:
             toc_html = f"<ul>{toc_html}</ul>"
        if not "<div class=\"toc\">" in toc_html :
            toc_content_html = f'<aside class="sidebar-toc"><div class="toc-container">\n<h4>Table of Contents</h4>\n{toc_html}\n</div></aside>'
        else:
            # The toc extension often adds <div class="toc"> directly
            toc_html_modified = toc_html.replace("<div class=\"toc\">", "<div class=\"toc-container\"><h4>Table of Contents</h4>", 1)
            toc_content_html = f'<aside class="sidebar-toc">{toc_html_modified}</aside>'
        
        html_body_final = f'<div class="content-with-toc"><main class="main-content">{html_body}</main>{toc_content_html}</div>'
    else:
        html_body_final = f'<main class="main-content">{html_body}</main>'
    
    html_template = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{os.path.splitext(base_name)[0]}</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    {navbar_html}
    {html_body_final}
    <script src="darkmode.js"></script>
</body>
</html>"""
    
    with open(html_file_path, 'w', encoding='utf-8') as f:
        f.write(html_template)
    
    print(f"Converted {base_name} to {html_file_name}")

def update_index_html_navbar(html_dir_abs_path, navbar_html_content):
    index_path = os.path.join(html_dir_abs_path, 'index.html')
    try:
        with open(index_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Replace the content of the first <nav class="navbar">...</nav>
        # This regex is basic; robust parsing might be better for complex HTML
        updated_content = re.sub(r'(<nav class="navbar">)(.*?)(</nav>)', 
                                 lambda m: m.group(1) + navbar_html_content + m.group(3), 
                                 content, 1, flags=re.DOTALL)
        # The lambda replaces only the inner content of the nav tag defined by the script generated one.
        # Better to replace the whole tag to ensure structure is what create_dynamic_navbar_html created.
        updated_content = re.sub(r'<nav class="navbar">.*?</nav>', 
                                 navbar_html_content, 
                                 content, 1, flags=re.DOTALL)

        if updated_content == content and "<nav class=\"navbar\">" in content:
            print(f"Warning: Navbar in {index_path} not updated. Regex might have failed.")
        elif not "<nav class=\"navbar\">" in content:
             print(f"Warning: No <nav class=\"navbar\"> found in {index_path}. Cannot update navbar.")

        with open(index_path, 'w', encoding='utf-8') as f:
            f.write(updated_content)
        print(f"Updated navbar in {index_path}")

    except FileNotFoundError:
        print(f"Error: {index_path} not found. Cannot update navbar.")
    except Exception as e:
        print(f"Error updating {index_path}: {e}")


# cleanup_old_html_files function might need revision based on where HTML files are stored
# and if we want to clean the output dir more broadly.
# For now, it's not called directly by the improved handler.

def watch_directory():
    script_dir_abs = Path(__file__).resolve().parent # Absolute path to html folder
    project_root_abs = script_dir_abs.parent      # Absolute path to AP CSA folder
    review_guides_sub_dir = 'reviewGuides' # Name of the sub-directory for markdown files
    
    # Ensure review_guides_dir exists
    review_guides_dir_abs = project_root_abs / review_guides_sub_dir
    if not review_guides_dir_abs.is_dir():
        print(f"Error: Review guides directory not found at {review_guides_dir_abs}")
        return

    observer = Observer()
    # Pass project_root for scanning, review_guides_sub_dir for MD context, and html_dir for output
    handler = MarkdownHandler(str(project_root_abs), review_guides_sub_dir, str(script_dir_abs))
    
    # Watch the review_guides_dir for MD file changes for specific conversions
    # Full project scan for navbar is done on init. For real-time nav updates on *any* file changes,
    # observer would need to watch project_root_abs and handler.on_any_event would be more complex.
    observer.schedule(handler, str(review_guides_dir_abs), recursive=True) # Watch reviewGuides dir for MD changes
    observer.start()
    
    try:
        print(f"Watching for .md file changes in: {review_guides_dir_abs}")
        print("Navbar structure generated based on initial project scan.")
        print("Restart script to update navbar for new/deleted project files/folders.")
        print("Press Ctrl+C to stop...")
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        observer.stop()
        print("\nStopped watching directory.")
    
    observer.join()

if __name__ == '__main__':
    watch_directory()
