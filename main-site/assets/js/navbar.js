// Navbar JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Make sure navbar is visible
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        navbar.style.transform = 'translateY(0)';
        navbar.style.opacity = '1';
    }

    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;
    
    // Add index to nav items for staggered animation
    const navItems = document.querySelectorAll('.nav-links .nav-items li');
    navItems.forEach((item, index) => {
        item.style.setProperty('--item-index', index);
    });

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleMenu();
        });
        
        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                closeMenu();
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (navLinks.classList.contains('active')) {
                if (!navLinks.contains(event.target) && !mobileMenuBtn.contains(event.target)) {
                    closeMenu();
                }
            }
        });
        
        // Close menu on ESC key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && navLinks.classList.contains('active')) {
                closeMenu();
            }
        });
        
        // Close menu on window resize
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
                closeMenu();
            }
        });
    }
    
    // Helper functions
    function toggleMenu() {
        navLinks.classList.toggle('active');
        body.classList.toggle('menu-open');
        
        // Toggle aria-expanded for accessibility
        const expanded = navLinks.classList.contains('active');
        mobileMenuBtn.setAttribute('aria-expanded', expanded);
        
        // Update menu icon
        mobileMenuBtn.innerHTML = expanded ? 
            '<i class="fas fa-times"></i>' : 
            '<i class="fas fa-bars"></i>';
    }
    
    function closeMenu() {
        navLinks.classList.remove('active');
        body.classList.remove('menu-open');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    }
    
    // Fix broken links
    fixNavLinks();
});

// Function to ensure all navigation links are correct
function fixNavLinks() {
    // Get current path
    const path = window.location.pathname;
    const isRoot = path.endsWith('index.html') || path.endsWith('/') || path === '';
    const isInSubfolder = path.includes('/pages/');
    const isInMainSite = path.includes('/main-site/');
    
    // Check if we're in the root directory
    const inRootDir = !isInSubfolder && !isInMainSite;
    
    const navLinks = document.querySelectorAll('a');
    
    // First clear all active classes on navigation items
    document.querySelectorAll('.nav-items a').forEach(link => {
        link.classList.remove('active');
    });
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (!href) return;
        
        // Set active class for current page for navigation items
        if (link.closest('.nav-items')) {
            // Create clean path for comparison (remove domain, get just the file part)
            const currentFile = path.split('/').pop();
            const linkFile = href.split('/').pop();
            
            const isHomePage = currentFile === '' || currentFile === 'index.html';
            
            // Special handling for home link
            if ((href === 'index.html' || href === '../index.html' || href === '../../index.html') && isHomePage) {
                link.classList.add('active');
            }
            // Handle other pages by comparing filenames
            else if (linkFile && currentFile === linkFile && !isHomePage) {
                link.classList.add('active');
            }
        }
        
        // Fix broken links based on current directory
        if (href === 'index.html' && isInSubfolder) {
            link.setAttribute('href', '../index.html');
        }
        
        // Prevent direct access to files that don't exist
        if (href.startsWith('projects/') && isInSubfolder) {
            link.setAttribute('href', '../pages/' + href);
        }
        
        if (href.startsWith('activities/') && isInSubfolder) {
            link.setAttribute('href', '../pages/' + href);
        }
        
        // Log fixed links for debugging
        console.log(`Fixed: ${href} -> ${link.getAttribute('href')}`);
    });
} 