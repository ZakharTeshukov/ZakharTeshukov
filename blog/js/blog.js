// Blog data structure
let blogPosts = [];
let currentPage = 1;
const postsPerPage = 6;
let filteredPosts = [];

// DOM Elements
const blogGrid = document.querySelector('.blog-grid');
const featuredPost = document.querySelector('.featured-post');
const popularPosts = document.querySelector('.popular-posts');
const tagCloud = document.querySelector('.tag-cloud');
const searchInput = document.querySelector('.search-input');
const categoryFilter = document.querySelector('.category-filter');
const sortOrder = document.querySelector('.sort-order');
const pagination = document.querySelector('.pagination');
const prevPageBtn = document.querySelector('.prev-page');
const nextPageBtn = document.querySelector('.next-page');
const currentPageSpan = document.querySelector('.current-page');
const totalPagesSpan = document.querySelector('.total-pages');

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
        
        if (!metadataScript) {
            throw new Error(`No metadata found in ${file}`);
        }
        
        try {
            const metadata = JSON.parse(metadataScript.textContent);
            return metadata;
        } catch (parseError) {
            throw new Error(`Invalid metadata JSON in ${file}: ${parseError.message}`);
        }
    } catch (error) {
        console.error(`Error extracting metadata from ${file}:`, error);
        throw error;
    }
}

// Load blog posts
async function loadBlogPosts() {
    try {
        console.log('Loading blog posts...');
        const response = await fetch('./posts/posts.json');
        if (!response.ok) {
            throw new Error(`Failed to fetch posts.json: ${response.status}`);
        }
        const data = await response.json();
        console.log('Found posts:', data);
        
        if (!data.posts || !Array.isArray(data.posts)) {
            throw new Error('Invalid posts.json format');
        }
        
        // Clear existing posts
        blogPosts = [];
        
        // Process each post
        for (const post of data.posts) {
            console.log('Processing post:', post.url);
            try {
                const metadata = await extractMetadata(`./posts/${post.url}`);
                if (metadata) {
                    blogPosts.push({
                        ...metadata,
                        url: post.url
                    });
                    console.log('Added post:', metadata.title);
                }
            } catch (error) {
                console.warn(`Error processing post ${post.url}:`, error);
            }
        }
        
        if (blogPosts.length === 0) {
            throw new Error('No valid blog posts found');
        }
        
        // Sort posts by date (newest first)
        blogPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
        filteredPosts = [...blogPosts];
        
        // Update display
        updateBlogDisplay();
        
    } catch (error) {
        console.error('Error loading blog posts:', error);
        showError(`Error loading blog posts: ${error.message}`);
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

// Show error message
function showError(message) {
    if (blogGrid) {
        blogGrid.innerHTML = `
            <div class="error-message">
                <h3>Error Loading Blog Posts</h3>
                <p>We're having trouble loading the blog posts. Please try again later.</p>
                <p class="error-details">${message}</p>
            </div>
        `;
    }
}

// Create post card HTML
function createPostCard(post) {
    const date = formatDate(post.date);
    return `
        <article class="blog-card">
            <div class="card-image">
                <img src="${post.image}" alt="${post.title}" loading="lazy">
                <div class="card-category">${post.category}</div>
            </div>
            <div class="card-content">
                <h3><a href="posts/${post.url}">${post.title}</a></h3>
                <p>${post.excerpt}</p>
                <div class="card-meta">
                    <span class="date"><i class="far fa-calendar"></i> ${date}</span>
                    <span class="reading-time"><i class="far fa-clock"></i> ${post.readingTime} min read</span>
                    <span class="views"><i class="far fa-eye"></i> ${post.views}</span>
                </div>
                <div class="card-tags">
                    ${post.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            </div>
        </article>
    `;
}

// Update featured post
function updateFeaturedPost(post) {
    if (!featuredPost) return;
    
    const date = formatDate(post.date);
    featuredPost.innerHTML = `
        <div class="featured-image">
            <img src="${post.image}" alt="${post.title}" loading="lazy">
            <div class="featured-category">${post.category}</div>
        </div>
        <div class="featured-content">
            <h2><a href="posts/${post.url}">${post.title}</a></h2>
            <p>${post.excerpt}</p>
            <div class="featured-meta">
                <span class="date"><i class="far fa-calendar"></i> ${date}</span>
                <span class="reading-time"><i class="far fa-clock"></i> ${post.readingTime} min read</span>
                <span class="views"><i class="far fa-eye"></i> ${post.views}</span>
            </div>
            <div class="featured-tags">
                ${post.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
        </div>
    `;
}

// Update blog display
function updateBlogDisplay() {
    if (!blogGrid) {
        console.error('Blog grid element not found');
        return;
    }
    
    // Sort posts
    filteredPosts.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return sortOrder.value === 'newest' ? dateB - dateA : dateA - dateB;
    });

    // Update featured post
    if (filteredPosts.length > 0) {
        updateFeaturedPost(filteredPosts[0]);
    }

    // Update blog grid
    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    const postsToShow = filteredPosts.slice(startIndex, endIndex);
    
    blogGrid.innerHTML = postsToShow.map(post => createPostCard(post)).join('');
    
    // Update pagination
    updatePagination();
    
    // Update popular posts
    updatePopularPosts();
    
    // Update tag cloud
    updateTagCloud();
}

// Update pagination
function updatePagination() {
    if (!pagination) return;
    
    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
    const paginationHTML = [];
    
    // Previous button
    paginationHTML.push(`
        <button class="pagination-btn" ${currentPage === 1 ? 'disabled' : ''} data-page="${currentPage - 1}">
            <i class="fas fa-chevron-left"></i>
        </button>
    `);
    
    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        paginationHTML.push(`
            <button class="pagination-btn ${i === currentPage ? 'active' : ''}" data-page="${i}">
                ${i}
            </button>
        `);
    }
    
    // Next button
    paginationHTML.push(`
        <button class="pagination-btn" ${currentPage === totalPages ? 'disabled' : ''} data-page="${currentPage + 1}">
            <i class="fas fa-chevron-right"></i>
        </button>
    `);
    
    pagination.innerHTML = paginationHTML.join('');
    
    // Update page info
    if (currentPageSpan) currentPageSpan.textContent = currentPage;
    if (totalPagesSpan) totalPagesSpan.textContent = totalPages;
}

// Update category filter
function updateCategoryFilter() {
    if (!categoryFilter) return;
    
    // Get unique categories from blog posts
    const categories = [...new Set(blogPosts.map(post => post.category))];
    
    categoryFilter.innerHTML = `
        <option value="all">All Categories</option>
        ${categories.map(category => `
            <option value="${category}">${category}</option>
        `).join('')}
    `;
}

// Update popular posts
function updatePopularPosts() {
    const popular = [...blogPosts]
        .sort((a, b) => b.views - a.views)
        .slice(0, 5);

    popularPosts.innerHTML = popular.map(post => `
        <a href="${post.url}" class="popular-post">
            <img src="${post.image}" alt="${post.title}">
            <div class="popular-post-content">
                <h4>${post.title}</h4>
                <p>${formatDate(post.date)}</p>
            </div>
        </a>
    `).join('');
}

// Update tag cloud
function updateTagCloud() {
    const tags = {};
    blogPosts.forEach(post => {
        post.tags.forEach(tag => {
            tags[tag] = (tags[tag] || 0) + 1;
        });
    });

    const sortedTags = Object.entries(tags)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 10);

    tagCloud.innerHTML = sortedTags.map(([tag, count]) => `
        <a href="#" data-tag="${tag}">${tag} <span class="count">${count}</span></a>
    `).join('');
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Event Listeners
if (searchInput) {
    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        filteredPosts = blogPosts.filter(post => 
            post.title.toLowerCase().includes(searchTerm) ||
            post.excerpt.toLowerCase().includes(searchTerm) ||
            post.tags.some(tag => tag.toLowerCase().includes(searchTerm))
        );
        currentPage = 1;
        updateBlogDisplay();
    });
}

if (categoryFilter) {
    categoryFilter.addEventListener('change', () => {
        const category = categoryFilter.value;
        filteredPosts = category === 'all'
            ? [...blogPosts]
            : blogPosts.filter(post => post.category.toLowerCase() === category.toLowerCase());
        currentPage = 1;
        updateBlogDisplay();
    });
}

if (sortOrder) {
    sortOrder.addEventListener('change', () => {
        updateBlogDisplay();
    });
}

if (pagination) {
    pagination.addEventListener('click', (e) => {
        if (e.target.classList.contains('pagination-btn')) {
            const page = parseInt(e.target.dataset.page);
            if (!isNaN(page) && page !== currentPage) {
                currentPage = page;
                updateBlogDisplay();
            }
        }
    });
}

if (tagCloud) {
    tagCloud.addEventListener('click', (e) => {
        e.preventDefault();
        const tag = e.target.dataset.tag;
        if (tag) {
            filteredPosts = blogPosts.filter(post => 
                post.tags.some(t => t.toLowerCase() === tag.toLowerCase())
            );
            currentPage = 1;
            updateBlogDisplay();
        }
    });
}

// Newsletter form
const newsletterForm = document.getElementById('newsletterForm');
const formSuccess = document.querySelector('.form-success');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;
        // Here you would typically send the email to your backend
        console.log('Newsletter subscription:', email);
        formSuccess.style.display = 'block';
        newsletterForm.reset();
        setTimeout(() => {
            formSuccess.style.display = 'none';
        }, 3000);
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing blog...');
    loadBlogPosts();
}); 