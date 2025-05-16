import markdown
import os
import glob
import shutil
import time
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler

class MarkdownHandler(FileSystemEventHandler):
    def __init__(self, review_guides_dir, html_dir):
        self.review_guides_dir = review_guides_dir
        self.html_dir = html_dir
        # Initial conversion of all files
        self.convert_all_files()
        
    def on_modified(self, event):
        if event.is_directory:
            return
        if event.src_path.endswith('.md'):
            print(f"\nDetected change in {os.path.basename(event.src_path)}")
            self.convert_file(event.src_path)
    
    def on_created(self, event):
        if event.is_directory:
            return
        if event.src_path.endswith('.md'):
            print(f"\nDetected new file {os.path.basename(event.src_path)}")
            self.convert_file(event.src_path)
    
    def convert_file(self, md_file_path):
        try:
            convert_md_to_html(md_file_path, self.html_dir)
        except Exception as e:
            print(f"Error converting {os.path.basename(md_file_path)}: {e}")
    
    def convert_all_files(self):
        # Clean up old HTML files first
        cleanup_old_html_files(self.review_guides_dir)
        
        # Convert all markdown files
        md_files = glob.glob(os.path.join(self.review_guides_dir, '*Review-Guide.md'))
        for md_file in md_files:
            self.convert_file(md_file)
        print("\nInitial conversion complete! Watching for changes...")

def convert_md_to_html(md_file_path, output_dir):
    # Get the filename
    base_name = os.path.basename(md_file_path)
    html_file_name = os.path.splitext(base_name)[0] + '.html'
    html_file_path = os.path.join(output_dir, html_file_name)
    
    # Read the Markdown file
    with open(md_file_path, 'r', encoding='utf-8') as f:
        md_text = f.read()
    
    # Convert Markdown to HTML with table support
    html_body = markdown.markdown(md_text, extensions=['fenced_code', 'codehilite', 'tables'])
    
    # Create navbar
    navbar = """
    <nav class="navbar">
        <a href="index.html">AP CSA Review Guides</a>
        <button class="theme-toggle" onclick="toggleDarkMode()">Switch to Dark Mode</button>
    </nav>
    """
    
    # Prepare full HTML with dark mode toggle and navbar
    html = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{os.path.splitext(base_name)[0]}</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    {navbar}
    {html_body}
    <script src="darkmode.js"></script>
</body>
</html>"""
    
    # Write to output HTML file
    with open(html_file_path, 'w', encoding='utf-8') as f:
        f.write(html)
    
    print(f"Converted {base_name} to {html_file_name}")

def cleanup_old_html_files(review_guides_dir):
    # Remove old HTML files from review guides directory
    old_html_files = glob.glob(os.path.join(review_guides_dir, '*.html'))
    for file in old_html_files:
        try:
            os.remove(file)
            print(f"Removed old HTML file: {file}")
        except Exception as e:
            print(f"Error removing {file}: {e}")

def watch_directory():
    # Get the script's directory
    script_dir = os.path.dirname(os.path.abspath(__file__))
    # Get the project root directory (parent of script directory)
    project_root = os.path.dirname(script_dir)
    # Path to review guides directory
    review_guides_dir = os.path.join(project_root, 'reviewGuides')
    
    # Create an observer and event handler
    observer = Observer()
    handler = MarkdownHandler(review_guides_dir, script_dir)
    
    # Schedule the observer to watch the review guides directory
    observer.schedule(handler, review_guides_dir, recursive=False)
    observer.start()
    
    try:
        print(f"Watching directory: {review_guides_dir}")
        print("Press Ctrl+C to stop...")
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        observer.stop()
        print("\nStopped watching directory.")
    
    observer.join()

if __name__ == '__main__':
    watch_directory()
