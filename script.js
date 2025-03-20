// Mobile Menu Functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
            
            // Update menu icon
            this.innerHTML = navLinks.classList.contains('active') ? 
                '<i class="fas fa-times"></i>' : 
                '<i class="fas fa-bars"></i>';
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                body.style.overflow = '';
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                navLinks.classList.remove('active');
                body.style.overflow = '';
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });

        // Handle window resize
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                navLinks.classList.remove('active');
                body.style.overflow = '';
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
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

// Smooth scrolling for anchor links
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

// Form handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Here you would typically send the data to a server
        console.log('Form submitted:', data);
        
        // Show success message
        const successMessage = document.querySelector('.form-success');
        if (successMessage) {
            successMessage.classList.add('show');
            this.reset();
        }
    });
}

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.project-card, .blog-card').forEach(el => {
    observer.observe(el);
});

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
