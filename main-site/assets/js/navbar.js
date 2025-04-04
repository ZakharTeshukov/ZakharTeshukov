/**
 * Navbar JavaScript for Zakhar Teshukov Portfolio
 * Handles mobile navigation menu and scroll effects
 */

document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation setup
    const initMobileNavigation = () => {
        const menuToggle = document.getElementById('menu-toggle');
        const menuBox = document.querySelector('.menu-box');
        const navLinks = document.querySelector('.nav-links');
        const body = document.body;
        
        // Add delay indices to nav items for staggered animation
        const navItems = document.querySelectorAll('.nav-links li');
        navItems.forEach((item, index) => {
            item.style.setProperty('--i', index + 1);
        });
        
        if (menuToggle) {
            // Toggle body scroll when menu is opened/closed
            menuToggle.addEventListener('change', () => {
                if (menuToggle.checked) {
                    // Prevent scrolling when menu is open
                    body.style.overflow = 'hidden';
                    body.style.position = 'fixed';
                    body.style.width = '100%';
                    body.classList.add('menu-open');
                } else {
                    // Restore scrolling when menu is closed
                    body.style.overflow = '';
                    body.style.position = '';
                    body.style.width = '';
                    body.classList.remove('menu-open');
                }
            });
            
            // Close menu when clicking on a link
            navLinks.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    menuToggle.checked = false;
                    // Restore scrolling
                    body.style.overflow = '';
                    body.style.position = '';
                    body.style.width = '';
                    body.classList.remove('menu-open');
                });
            });
            
            // Close menu on ESC key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && menuToggle.checked) {
                    menuToggle.checked = false;
                    body.style.overflow = '';
                    body.style.position = '';
                    body.style.width = '';
                    body.classList.remove('menu-open');
                }
            });
        }
    };
    
    // Navbar scroll effects
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
    
    // Set active link based on current page
    const setActiveNavLink = () => {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav-links a');
        
        navLinks.forEach(link => {
            // Remove active class from all links
            link.classList.remove('active');
            
            // Get the path from the href attribute
            const linkPath = link.getAttribute('href');
            if (!linkPath) return;
            
            // Set active class for matching paths or home page
            if (currentPath.endsWith(linkPath) || 
                (currentPath.endsWith('/') && linkPath === 'index.html') ||
                (currentPath.endsWith('/index.html') && linkPath === 'index.html')) {
                link.classList.add('active');
            }
        });
    };
    
    // Add touch swipe support for closing menu
    const initTouchSupport = () => {
        let touchStartX = 0;
        const menuToggle = document.getElementById('menu-toggle');
        const body = document.body;
        
        document.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        document.addEventListener('touchend', (e) => {
            const touchEndX = e.changedTouches[0].screenX;
            
            // Close menu on swipe (any direction with minimum 75px swipe)
            if (menuToggle && menuToggle.checked && Math.abs(touchEndX - touchStartX) > 75) {
                menuToggle.checked = false;
                body.style.overflow = '';
                body.style.position = '';
                body.style.width = '';
                body.classList.remove('menu-open');
            }
        });
    };
    
    // Handle window resize
    const initResizeHandler = () => {
        const menuToggle = document.getElementById('menu-toggle');
        const body = document.body;
        
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && menuToggle && menuToggle.checked) {
                menuToggle.checked = false;
                body.style.overflow = '';
                body.style.position = '';
                body.style.width = '';
                body.classList.remove('menu-open');
            }
        });
    };

    // Initialize all navigation functionality
    initMobileNavigation();
    initScrollEffect();
    setActiveNavLink();
    initTouchSupport();
    initResizeHandler();
}); 