// Navbar JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Make sure navbar is visible
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        navbar.style.transform = 'translateY(0)';
    }

    // Mobile menu toggle
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

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (navLinks && navLinks.classList.contains('active')) {
                if (!navLinks.contains(event.target) && !mobileMenuBtn.contains(event.target)) {
                    navLinks.classList.remove('active');
                    body.style.overflow = '';
                    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                }
            }
        });
        
        // Close menu on window resize
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                navLinks.classList.remove('active');
                body.style.overflow = '';
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
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
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (!href) return;
        
        // Set active class for current page for navigation items
        if (link.closest('.nav-items') && 
            path.includes(href) && 
            href !== '' && 
            href !== 'index.html' && 
            href !== '../index.html') {
            link.classList.add('active');
        } else if (link.closest('.nav-items') && 
                  (path.endsWith('index.html') || path.endsWith('/') || path === '') && 
                  (href === 'index.html' || href === '../index.html')) {
            link.classList.add('active');
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