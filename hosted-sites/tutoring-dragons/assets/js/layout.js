/**
 * Layout JavaScript - Contains functionality for navbar and footer
 */

document.addEventListener('DOMContentLoaded', () => {
    // Mobile navigation setup
    const initMobileNavigation = () => {
        const mobileBtn = document.querySelector('.mobile-menu-btn');
        const navLinks = document.querySelector('.nav-links');
        const navItems = document.querySelectorAll('.nav-links li');
        
        // Add delay indices to nav items for staggered animation
        navItems.forEach((item, index) => {
            item.style.setProperty('--i', index);
        });
        
        if (mobileBtn) {
            mobileBtn.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent document click from immediately closing
                
                // Toggle navigation
                navLinks.classList.toggle('active');
                
                // Change hamburger icon to close icon
                mobileBtn.innerHTML = navLinks.classList.contains('active') 
                    ? '<i class="fas fa-times"></i>' 
                    : '<i class="fas fa-bars"></i>';
                
                // Toggle body scroll
                document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
            });

            // Close mobile menu when clicking outside
            document.addEventListener('click', (e) => {
                const nav = document.querySelector('.main-nav');
                if (nav && !nav.contains(e.target) && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    mobileBtn.innerHTML = '<i class="fas fa-bars"></i>';
                    document.body.style.overflow = '';
                }
            });
            
            // Close mobile menu on ESC key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    mobileBtn.innerHTML = '<i class="fas fa-bars"></i>';
                    document.body.style.overflow = '';
                }
            });
            
            // Prevent clicks on menu items from bubbling to document
            navLinks.addEventListener('click', (e) => {
                e.stopPropagation();
            });
            
            // Close mobile menu when a link is clicked
            navLinks.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    navLinks.classList.remove('active');
                    mobileBtn.innerHTML = '<i class="fas fa-bars"></i>';
                    document.body.style.overflow = '';
                });
            });
        }
    };
    
    // Add shrink effect to navbar on scroll
    const initScrollEffect = () => {
        const navbar = document.querySelector('.main-nav');
        
        if (navbar) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            });
        }
    };

    // Newsletter subscription form in footer
    const initNewsletterForm = () => {
        const form = document.querySelector('.newsletter-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const emailInput = form.querySelector('input[type="email"]');
                
                if (emailInput && emailInput.value.trim()) {
                    // In a real implementation, this would send the subscription to a server
                    alert('Thank you for subscribing to our newsletter!');
                    emailInput.value = '';
                } else {
                    alert('Please enter a valid email address.');
                }
            });
        }
    };

    // Smooth scrolling for anchor links
    const initSmoothScrolling = () => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const target = document.querySelector(targetId);
                if (target) {
                    e.preventDefault();
                    
                    // Calculate offset based on navbar height
                    const navbarHeight = document.querySelector('.main-nav').offsetHeight;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
                    const offsetPosition = targetPosition - navbarHeight - 20; // Extra 20px padding
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    };
    
    // Set active link based on current page
    const setActiveNavLink = () => {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav-links a');
        
        navLinks.forEach(link => {
            // Remove active class from all links
            link.classList.remove('active');
            
            // Get the path from the href attribute
            const linkPath = link.getAttribute('href');
            
            // Set active class for matching paths or home page
            if (currentPath.endsWith(linkPath) || 
                (currentPath.endsWith('/') && linkPath === 'index.html') ||
                (currentPath.endsWith('/index.html') && linkPath === 'index.html')) {
                link.classList.add('active');
            }
        });
    };

    // Initialize all layout functionality
    initMobileNavigation();
    initScrollEffect();
    initNewsletterForm();
    initSmoothScrolling();
    setActiveNavLink();
}); 