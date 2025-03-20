/**
 * Main JavaScript File (script.js)
 * ------------------------------
 * Structure:
 * 1. Constants & Variables
 * 2. Navigation Functions
 * 3. Project Card Functions
 * 4. Event Listeners
 * 5. Utility Functions
 */

// Constants & DOM Elements
const navbar = document.querySelector('.navbar');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const body = document.body;

/**
 * Navigation Functions
 * ------------------
 */

// Toggle mobile menu
const toggleMobileMenu = () => {
    navLinks.classList.toggle('active');
    mobileMenuBtn.classList.toggle('active');
    // Accessibility
    const isExpanded = navLinks.classList.contains('active');
    mobileMenuBtn.setAttribute('aria-expanded', isExpanded);
    body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    
    // Update menu icon
    mobileMenuBtn.innerHTML = navLinks.classList.contains('active') ? 
        '<i class="fas fa-times"></i>' : 
        '<i class="fas fa-bars"></i>';
};

// Handle scroll events for navbar
const handleScroll = () => {
    const scrollPosition = window.scrollY;
    if (scrollPosition > 50) {
        navbar.classList.add('scrolled');
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.classList.remove('scrolled');
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
};

/**
 * Project Card Functions
 * --------------------
 */

// Load project cards dynamically
const loadProjects = async () => {
    try {
        const projectGrid = document.querySelector('.project-grid');
        if (!projectGrid) return;

        // Add loading state
        projectGrid.innerHTML = '<div class="loading">Loading projects...</div>';

        try {
            // Fetch projects data
            const response = await fetch('/src/data/projects.json');
            const data = await response.json();
            const projects = data.projects;

            if (projects && projects.length > 0) {
                // Render projects
                projectGrid.innerHTML = projects.map(project => `
                    <div class="project-card" data-project-id="${project.id}">
                        <div class="project-image" style="background-image: url(${project.image})">
                            <div class="project-overlay">
                                <a href="${project.link}" class="view-project">View Project</a>
                            </div>
                        </div>
                        <div class="project-content">
                            <h3>${project.title}</h3>
                            <p>${project.description}</p>
                            <div class="project-tech">
                                ${project.technologies.map(tech => `<span>${tech}</span>`).join('')}
                            </div>
                        </div>
                    </div>
                `).join('');
            } else {
                throw new Error('No projects found');
            }
        } catch (error) {
            // Fallback content if fetch fails
            projectGrid.innerHTML = `
                <div class="project-card">
                    <div class="project-image"></div>
                    <div class="project-content">
                        <h3>AI Image Generator</h3>
                        <p>Advanced AI-powered image generation using DALL-E API.</p>
                        <div class="project-tech">
                            <span>React</span>
                            <span>Node.js</span>
                            <span>OpenAI</span>
                        </div>
                    </div>
                </div>
                <div class="project-card">
                    <div class="project-image"></div>
                    <div class="project-content">
                        <h3>AI Code Assistant</h3>
                        <p>Intelligent coding assistant powered by machine learning.</p>
                        <div class="project-tech">
                            <span>Python</span>
                            <span>TensorFlow</span>
                            <span>GPT-3</span>
                        </div>
                    </div>
                </div>
                <div class="project-card">
                    <div class="project-image"></div>
                    <div class="project-content">
                        <h3>Real-time Chat App</h3>
                        <p>Feature-rich chat application with real-time messaging.</p>
                        <div class="project-tech">
                            <span>Socket.io</span>
                            <span>Express</span>
                            <span>MongoDB</span>
                        </div>
                    </div>
                </div>
            `;
        }

        // Add hover effects to project cards
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.classList.add('hover');
            });
            card.addEventListener('mouseleave', () => {
                card.classList.remove('hover');
            });
        });
    } catch (error) {
        console.error('Error in loadProjects:', error);
    }
};

/**
 * Event Listeners
 * -------------
 */

// Initialize event listeners
const initEventListeners = () => {
    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);

    // Scroll events
    window.addEventListener('scroll', handleScroll);

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navLinks.classList.contains('active') && 
            !e.target.closest('.nav-links') && 
            !e.target.closest('.mobile-menu-btn')) {
            toggleMobileMenu();
        }
    });

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

    document.querySelectorAll('.project-card').forEach(el => {
        observer.observe(el);
        el.addEventListener('mouseenter', () => {
            el.classList.add('hover');
        });
        el.addEventListener('mouseleave', () => {
            el.classList.remove('hover');
        });
    });

    // Navbar scroll handling
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > lastScrollY) {
            navbar.classList.add('hidden');
        } else {
            navbar.classList.remove('hidden');
        }

        lastScrollY = currentScrollY;
    });
};

/**
 * Utility Functions
 * ---------------
 */

// Debounce function for scroll events
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Initialize the application
const init = () => {
    initEventListeners();
    loadProjects();
};

// Start the application when DOM is loaded
document.addEventListener('DOMContentLoaded', init); 