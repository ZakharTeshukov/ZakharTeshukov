/**
 * Home Page JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
    // Check if device is mobile
    const isMobile = () => {
        return window.innerWidth <= 768 || ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    };

    // Animation for elements when they come into view
    const animateElements = () => {
        const elements = document.querySelectorAll('.hero-content, .subject-card, .feature, .story-card');
        
        // Immediately animate hero content without intersection observer
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            setTimeout(() => {
                heroContent.classList.add('animate');
            }, 100);
        }
        
        // Use intersection observer for other elements
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add a slight delay for staggered animations on mobile
                    if (isMobile()) {
                        const delay = Array.from(elements).indexOf(entry.target) * 50;
                        setTimeout(() => {
                            entry.target.classList.add('animate');
                        }, delay);
                    } else {
                        entry.target.classList.add('animate');
                    }
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: isMobile() ? 0.05 : 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        elements.forEach(item => {
            // Skip hero content as it's handled separately
            if (!item.classList.contains('hero-content')) {
                observer.observe(item);
            }
        });
    };
    
    // Interactive subject cards with touch support
    const initSubjectCards = () => {
        const cards = document.querySelectorAll('.subject-card');
        cards.forEach(card => {
            // For desktop, add hover effects
            if (!isMobile()) {
                card.addEventListener('mouseenter', () => {
                    // Add slight scale effect in addition to the translateY that's in CSS
                    card.style.transform = 'translateY(-5px) scale(1.02)';
                });
                
                card.addEventListener('mouseleave', () => {
                    // Reset to default hover state
                    card.style.transform = 'translateY(-5px)';
                    
                    // After transition is complete, remove inline styles
                    setTimeout(() => {
                        if (!card.matches(':hover')) {
                            card.style.transform = '';
                        }
                    }, 300);
                });
            }
            
            // Add click/touch event if the card is meant to be clickable
            const link = card.querySelector('a');
            if (link) {
                card.style.cursor = 'pointer';
                
                // For mobile devices, add a touch feedback effect
                if (isMobile()) {
                    card.addEventListener('touchstart', () => {
                        card.style.transform = 'translateY(-3px) scale(1.01)';
                    }, { passive: true });
                    
                    card.addEventListener('touchend', () => {
                        card.style.transform = '';
                    }, { passive: true });
                }
                
                card.addEventListener('click', (e) => {
                    // Check if the click was on the link itself
                    if (e.target !== link && !link.contains(e.target)) {
                        link.click();
                    }
                });
            }
        });
    };
    
    // Testimonial carousel/slider (if needed)
    const initTestimonialSlider = () => {
        const slider = document.querySelector('.testimonial-slider');
        if (slider) {
            const slides = slider.querySelectorAll('.testimonial');
            const nextBtn = slider.querySelector('.slider-next');
            const prevBtn = slider.querySelector('.slider-prev');
            let currentIndex = 0;
            let touchStartX = 0;
            let touchEndX = 0;
            
            // Helper function to update the slide display
            const updateSlides = () => {
                slides.forEach((slide, index) => {
                    slide.style.display = index === currentIndex ? 'block' : 'none';
                });
            };
            
            // Set initial state
            updateSlides();
            
            // Add event listeners for navigation buttons
            if (nextBtn) {
                nextBtn.addEventListener('click', () => {
                    currentIndex = (currentIndex + 1) % slides.length;
                    updateSlides();
                });
            }
            
            if (prevBtn) {
                prevBtn.addEventListener('click', () => {
                    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
                    updateSlides();
                });
            }
            
            // Add touch swipe support for mobile
            if (isMobile()) {
                slider.addEventListener('touchstart', (e) => {
                    touchStartX = e.changedTouches[0].screenX;
                }, { passive: true });
                
                slider.addEventListener('touchend', (e) => {
                    touchEndX = e.changedTouches[0].screenX;
                    handleSwipe();
                }, { passive: true });
                
                const handleSwipe = () => {
                    const swipeThreshold = 50;
                    if (touchEndX < touchStartX - swipeThreshold) {
                        // Swipe left - next slide
                        currentIndex = (currentIndex + 1) % slides.length;
                        updateSlides();
                    } else if (touchEndX > touchStartX + swipeThreshold) {
                        // Swipe right - previous slide
                        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
                        updateSlides();
                    }
                };
            }
            
            // Auto-advance slides every 5 seconds (pause on mobile touch)
            let autoPlay = setInterval(() => {
                currentIndex = (currentIndex + 1) % slides.length;
                updateSlides();
            }, 5000);
            
            // Pause autoplay when touching slider on mobile
            if (isMobile()) {
                slider.addEventListener('touchstart', () => {
                    clearInterval(autoPlay);
                }, { passive: true });
                
                slider.addEventListener('touchend', () => {
                    autoPlay = setInterval(() => {
                        currentIndex = (currentIndex + 1) % slides.length;
                        updateSlides();
                    }, 5000);
                }, { passive: true });
            }
        }
    };
    
    // YouTube video modal (if needed)
    const initVideoModal = () => {
        const videoTriggers = document.querySelectorAll('.video-trigger');
        
        videoTriggers.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                
                const videoId = trigger.dataset.video;
                if (!videoId) return;
                
                // Create modal
                const modal = document.createElement('div');
                modal.className = 'video-modal';
                modal.innerHTML = `
                    <div class="modal-content">
                        <span class="close-modal">&times;</span>
                        <div class="video-container">
                            <iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1" 
                                    frameborder="0" 
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowfullscreen>
                            </iframe>
                        </div>
                    </div>
                `;
                
                // Add styles
                modal.style.position = 'fixed';
                modal.style.top = '0';
                modal.style.left = '0';
                modal.style.width = '100%';
                modal.style.height = '100%';
                modal.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
                modal.style.zIndex = '1000';
                modal.style.display = 'flex';
                modal.style.alignItems = 'center';
                modal.style.justifyContent = 'center';
                
                const modalContent = modal.querySelector('.modal-content');
                modalContent.style.position = 'relative';
                modalContent.style.width = '90%';
                modalContent.style.maxWidth = isMobile() ? '95%' : '800px';
                modalContent.style.backgroundColor = 'white';
                modalContent.style.borderRadius = '5px';
                modalContent.style.padding = isMobile() ? '15px' : '20px';
                
                const closeBtn = modal.querySelector('.close-modal');
                closeBtn.style.position = 'absolute';
                closeBtn.style.top = isMobile() ? '5px' : '10px';
                closeBtn.style.right = isMobile() ? '10px' : '15px';
                closeBtn.style.fontSize = isMobile() ? '28px' : '24px'; // Larger touch target on mobile
                closeBtn.style.cursor = 'pointer';
                closeBtn.style.zIndex = '1';
                closeBtn.style.color = '#333';
                closeBtn.style.fontWeight = 'bold';
                
                const videoContainer = modal.querySelector('.video-container');
                videoContainer.style.position = 'relative';
                videoContainer.style.paddingBottom = '56.25%'; // 16:9 aspect ratio
                videoContainer.style.height = '0';
                videoContainer.style.overflow = 'hidden';
                
                const iframe = modal.querySelector('iframe');
                iframe.style.position = 'absolute';
                iframe.style.top = '0';
                iframe.style.left = '0';
                iframe.style.width = '100%';
                iframe.style.height = '100%';
                
                // Add to document
                document.body.appendChild(modal);
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
                
                // Close modal functionality
                const closeModal = () => {
                    document.body.removeChild(modal);
                    document.body.style.overflow = ''; // Restore scrolling
                };
                
                closeBtn.addEventListener('click', closeModal);
                modal.addEventListener('click', (e) => {
                    if (e.target === modal) closeModal();
                });
                
                // Close on ESC key
                document.addEventListener('keydown', (e) => {
                    if (e.key === 'Escape') closeModal();
                });
            });
        });
    };

    // Handle resize events for responsive behavior
    const handleResize = () => {
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                // Reinitialize components that need to adapt to new screen size
                initSubjectCards();
            }, 250);
        });
    };
    
    // Initialize all functions
    animateElements();
    initSubjectCards();
    initTestimonialSlider();
    initVideoModal();
    handleResize();

    // Enhanced logo animations
    initLogoAnimations();
});

/**
 * Initialize advanced logo animations
 */
function initLogoAnimations() {
    // Navbar logo animation
    const navbarLogo = document.querySelector('.main-nav .logo');
    if (navbarLogo) {
        // Add mouse movement parallax effect
        navbarLogo.addEventListener('mousemove', (e) => {
            const logo = navbarLogo.querySelector('i');
            const rect = navbarLogo.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Calculate rotation based on mouse position
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            // Apply transform
            logo.style.transform = `perspective(300px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        // Reset transform on mouse leave
        navbarLogo.addEventListener('mouseleave', () => {
            const logo = navbarLogo.querySelector('i');
            logo.style.transform = '';
        });
    }
    
    // Hero logo animation
    const heroLogo = document.querySelector('.hero-logo');
    if (heroLogo) {
        // Create particle effect for hero logo
        createParticleEffect(heroLogo);
        
        // Add click interaction to hero logo
        heroLogo.addEventListener('click', () => {
            heroLogo.classList.add('logo-pulse');
            setTimeout(() => {
                heroLogo.classList.remove('logo-pulse');
            }, 700);
        });
    }
}

/**
 * Creates particle effect around the hero logo
 */
function createParticleEffect(logoElement) {
    // Only create effect on larger screens to avoid performance issues on mobile
    if (window.innerWidth < 768) return;
    
    const logoRect = logoElement.getBoundingClientRect();
    const particleContainer = document.createElement('div');
    particleContainer.className = 'logo-particles';
    particleContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
    `;
    
    // Insert container before the logo
    logoElement.parentNode.insertBefore(particleContainer, logoElement);
    
    // Create particles
    for (let i = 0; i < 12; i++) {
        const particle = document.createElement('div');
        particle.className = 'logo-particle';
        particle.style.cssText = `
            position: absolute;
            width: 8px;
            height: 8px;
            background-color: var(--secondary-color);
            border-radius: 50%;
            opacity: 0;
            pointer-events: none;
            z-index: 1;
        `;
        
        // Random starting positions around the logo
        const angle = Math.random() * Math.PI * 2;
        const distance = 20 + Math.random() * 30;
        const startX = logoRect.width / 2 + Math.cos(angle) * distance;
        const startY = logoRect.height / 2 + Math.sin(angle) * distance;
        
        particle.style.left = `${startX}px`;
        particle.style.top = `${startY}px`;
        
        particleContainer.appendChild(particle);
        
        // Animate the particle
        animateParticle(particle);
    }
}

/**
 * Animates a single particle with random motion
 */
function animateParticle(particle) {
    // Random delay before starting animation
    const delay = Math.random() * 3000;
    
    setTimeout(() => {
        // Set initial position and properties
        const size = 3 + Math.random() * 5;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Start animation
        particle.style.animation = `
            float-particle ${3 + Math.random() * 4}s ease-in-out infinite,
            pulse-opacity ${2 + Math.random() * 2}s ease-in-out infinite
        `;
        
        // Add animation keyframes if they don't already exist
        if (!document.querySelector('#particle-keyframes')) {
            const keyframes = document.createElement('style');
            keyframes.id = 'particle-keyframes';
            keyframes.innerHTML = `
                @keyframes float-particle {
                    0% { transform: translate(0, 0); }
                    25% { transform: translate(${-10 - Math.random() * 30}px, ${-5 - Math.random() * 20}px); }
                    50% { transform: translate(${Math.random() * 20}px, ${-20 - Math.random() * 20}px); }
                    75% { transform: translate(${10 + Math.random() * 30}px, ${-5 - Math.random() * 10}px); }
                    100% { transform: translate(0, 0); }
                }
                
                @keyframes pulse-opacity {
                    0% { opacity: 0; }
                    50% { opacity: ${0.3 + Math.random() * 0.4}; }
                    100% { opacity: 0; }
                }
                
                .logo-pulse {
                    animation: logo-pulse-effect 0.7s ease-out !important;
                }
                
                @keyframes logo-pulse-effect {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.3); }
                    100% { transform: scale(1); }
                }
            `;
            document.head.appendChild(keyframes);
        }
    }, delay);
} 