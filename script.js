// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const menuButton = document.createElement('button');
    menuButton.className = 'menu-button';
    menuButton.innerHTML = '☰';
    menuButton.setAttribute('aria-label', 'Toggle menu');
    
    const navContent = document.querySelector('.nav-content');
    const navLinks = document.querySelector('.nav-links');
    
    if (navContent && navLinks) {
        navContent.insertBefore(menuButton, navLinks);
        
        menuButton.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!navContent.contains(event.target) && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });
    }
});

// Blog post loading functionality
async function loadBlogPosts() {
    try {
        const response = await fetch('/blog/posts.json');
        const data = await response.json();
        const blogGrid = document.querySelector('.blog-grid');
        
        if (blogGrid) {
            blogGrid.innerHTML = data.posts.map(post => `
                <article class="blog-card">
                    <img src="${post.image || '../images/default-blog.jpg'}" alt="${post.title}">
                    <div class="blog-card-content">
                        <h2><a href="/blog/${post.url}">${post.title}</a></h2>
                        <div class="blog-card-meta">
                            <span>${new Date(post.date).toLocaleDateString('en-US', { 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                            })}</span>
                            <span>${post.readingTime || '5 min read'}</span>
                        </div>
                        <p class="blog-card-description">${post.description || ''}</p>
                        <div class="blog-card-tags">
                            ${post.tags ? post.tags.map(tag => `
                                <span class="blog-card-tag">${tag}</span>
                            `).join('') : ''}
                        </div>
                    </div>
                </article>
            `).join('');

            // Add filter functionality
            const filterButtons = document.querySelectorAll('.filter-btn');
            const searchInput = document.querySelector('#search-input');
            let currentCategory = 'all';

            filterButtons.forEach(button => {
                button.addEventListener('click', () => {
                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    button.classList.add('active');
                    currentCategory = button.dataset.category;
                    filterPosts();
                });
            });

            searchInput.addEventListener('input', filterPosts);

            function filterPosts() {
                const searchQuery = searchInput.value.toLowerCase();
                const posts = document.querySelectorAll('.blog-card');
                
                posts.forEach(post => {
                    const title = post.querySelector('h2').textContent.toLowerCase();
                    const description = post.querySelector('.blog-card-description').textContent.toLowerCase();
                    const tags = Array.from(post.querySelectorAll('.blog-card-tag'))
                        .map(tag => tag.textContent.toLowerCase());
                    
                    const matchesSearch = title.includes(searchQuery) || 
                                        description.includes(searchQuery) ||
                                        tags.some(tag => tag.includes(searchQuery));
                    
                    const category = post.dataset.category || 'all';
                    const matchesCategory = currentCategory === 'all' || category === currentCategory;
                    
                    post.style.display = matchesSearch && matchesCategory ? 'block' : 'none';
                });
            }
        }
    } catch (error) {
        console.error('Error loading blog posts:', error);
    }
}

// Load blog posts when on the blog page
if (document.querySelector('.blog-grid')) {
    loadBlogPosts();
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form submission handling
const contactForm = document.querySelector('#contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Add your form submission logic here
        alert('Thank you for your message! I will get back to you soon.');
        this.reset();
    });
}
// Navbar background change on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
}); 
