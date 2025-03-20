// Blog post data structure
let blogPosts = [];

// Function to extract metadata from blog post HTML files
async function extractMetadata(file) {
    try {
        const response = await fetch(file);
        if (!response.ok) {
            throw new Error(`Failed to fetch ${file}: ${response.status}`);
        }
        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const metadataScript = doc.querySelector('script[type="application/json"]');
        
        if (metadataScript) {
            const metadata = JSON.parse(metadataScript.textContent);
            metadata.url = file;
            return metadata;
        }
        console.warn(`No metadata found in ${file}`);
        return null;
    } catch (error) {
        console.error('Error extracting metadata:', error);
        return null;
    }
}

// Function to load all blog posts
async function loadBlogPosts() {
    try {
        console.log('Loading blog posts...');
        const response = await fetch('./posts/posts.json');
        if (!response.ok) {
            throw new Error(`Failed to fetch posts.json: ${response.status}`);
        }
        const posts = await response.json();
        console.log('Found posts:', posts);
        
        // Clear existing posts
        blogPosts = [];
        
        // Process each post
        for (const post of posts) {
            console.log('Processing post:', post.url);
            const metadata = await extractMetadata(`./posts/${post.url}`);
            if (metadata) {
                blogPosts.push(metadata);
                console.log('Added post:', metadata.title);
            }
        }
        
        if (blogPosts.length === 0) {
            throw new Error('No valid blog posts found');
        }
        
        // Sort posts by date (newest first)
        blogPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        // Display posts
        displayBlogPosts(blogPosts);
    } catch (error) {
        console.error('Error loading blog posts:', error);
        const blogGrid = document.querySelector('.blog-grid');
        if (blogGrid) {
            blogGrid.innerHTML = `
                <div class="error-message">
                    <h3>Error Loading Blog Posts</h3>
                    <p>We're having trouble loading the blog posts. Please try again later.</p>
                    <p class="error-details">${error.message}</p>
                </div>
            `;
        }
    }
}

// Function to display blog posts
function displayBlogPosts(posts) {
    const blogGrid = document.querySelector('.blog-grid');
    if (!blogGrid) {
        console.error('Blog grid element not found');
        return;
    }
    
    blogGrid.innerHTML = '';
    
    if (posts.length === 0) {
        blogGrid.innerHTML = '<p class="no-posts">No posts found.</p>';
        return;
    }
    
    console.log('Displaying posts:', posts);
    posts.forEach(post => {
        const postElement = createPostElement(post);
        blogGrid.appendChild(postElement);
    });
}

// Function to create a blog post element
function createPostElement(post) {
    const article = document.createElement('article');
    article.className = 'blog-post';
    
    const date = new Date(post.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    article.innerHTML = `
        <div class="post-preview">
            <h2><a href="${post.url}">${post.title}</a></h2>
            <div class="post-meta">
                <span>${date}</span>
                <span>${post.readingTime || '5 min read'}</span>
            </div>
            <div class="post-categories">
                <span class="category">${post.category}</span>
                ${(post.tags || []).map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
            <p>${post.description || 'No description available.'}</p>
            <a href="${post.url}" class="read-more">Read More →</a>
        </div>
    `;
    
    return article;
}

// Event listener
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing blog...');
    loadBlogPosts();
}); 