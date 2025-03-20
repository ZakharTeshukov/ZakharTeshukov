// Blog post data structure
let blogPosts = [];

// Function to extract metadata from blog post HTML files
async function extractMetadata(file) {
    try {
        const response = await fetch(file);
        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const metadataScript = doc.querySelector('script[type="application/json"]');
        
        if (metadataScript) {
            const metadata = JSON.parse(metadataScript.textContent);
            metadata.url = file;
            return metadata;
        }
        return null;
    } catch (error) {
        console.error('Error extracting metadata:', error);
        return null;
    }
}

// Function to load all blog posts
async function loadBlogPosts() {
    try {
        const response = await fetch('posts.json');
        const posts = await response.json();
        
        for (const post of posts) {
            const metadata = await extractMetadata(post.url);
            if (metadata) {
                blogPosts.push(metadata);
            }
        }
        
        // Sort posts by date (newest first)
        blogPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        // Display posts
        displayBlogPosts(blogPosts);
    } catch (error) {
        console.error('Error loading blog posts:', error);
    }
}

// Function to display blog posts
function displayBlogPosts(posts) {
    const blogGrid = document.getElementById('blogGrid');
    blogGrid.innerHTML = '';
    
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
                <span class="post-date">${date}</span>
                <span class="post-category">${post.category}</span>
                <span class="post-reading-time">${post.readingTime}</span>
            </div>
            <p>${post.description}</p>
            <div class="post-tags">
                ${post.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
            <a href="${post.url}" class="read-more">Read More</a>
        </div>
    `;
    
    return article;
}

// Function to filter posts by category
function filterPostsByCategory(category) {
    if (category === 'all') {
        displayBlogPosts(blogPosts);
    } else {
        const filteredPosts = blogPosts.filter(post => post.category === category);
        displayBlogPosts(filteredPosts);
    }
}

// Function to search posts
function searchPosts(query) {
    const searchQuery = query.toLowerCase();
    const filteredPosts = blogPosts.filter(post => 
        post.title.toLowerCase().includes(searchQuery) ||
        post.description.toLowerCase().includes(searchQuery) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery))
    );
    displayBlogPosts(filteredPosts);
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    loadBlogPosts();
    
    // Category filter buttons
    const categoryButtons = document.querySelectorAll('.category-btn');
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            filterPostsByCategory(button.dataset.category);
        });
    });
    
    // Search input
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', (e) => {
        searchPosts(e.target.value);
    });
}); 