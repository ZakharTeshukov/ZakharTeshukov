// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', () => {
    // Add mobile menu button to the navigation
    const nav = document.querySelector('.main-nav');
    const mobileBtn = document.createElement('button');
    mobileBtn.className = 'mobile-menu-btn';
    mobileBtn.innerHTML = '<i class="fas fa-bars"></i>';
    nav.appendChild(mobileBtn);

    const navLinks = document.querySelector('.nav-links');
    mobileBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileBtn.innerHTML = navLinks.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            mobileBtn.innerHTML = '<i class="fas fa-bars"></i>';
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
                // Close mobile menu if open
                navLinks.classList.remove('active');
                mobileBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    });

    // Add scroll animation for elements
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.subject-card, .feature');
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight * 0.9 && elementBottom > 0) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Initialize element states
    document.querySelectorAll('.subject-card, .feature').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
    });

    // Add scroll event listener
    window.addEventListener('scroll', animateOnScroll);
    // Initial check for elements in view
    animateOnScroll();

    // Add hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('.subject-card, .feature, .cta-button');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            element.style.transform = 'translateY(-5px)';
        });
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'translateY(0)';
        });
    });
}); 