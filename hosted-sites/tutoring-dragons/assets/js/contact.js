/**
 * Contact Page JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
    // Animation for elements when they come into view
    const animateElements = () => {
        const elements = document.querySelectorAll('.contact-form-container, .contact-info, .contact-item');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        elements.forEach(item => {
            observer.observe(item);
        });
    };
    
    // Contact form validation and submission
    const initContactForm = () => {
        const form = document.querySelector('.contact-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                
                if (validateForm(form)) {
                    // Simulate form submission
                    const formSuccess = document.createElement('div');
                    formSuccess.className = 'form-success';
                    formSuccess.textContent = 'Thank you for your message! We will get back to you soon.';
                    
                    form.prepend(formSuccess);
                    formSuccess.style.display = 'block';
                    
                    // Reset form
                    form.reset();
                    
                    // Hide success message after 5 seconds
                    setTimeout(() => {
                        formSuccess.style.display = 'none';
                    }, 5000);
                }
            });
        }
    };
    
    // Form validation function
    const validateForm = (form) => {
        let isValid = true;
        const requiredFields = form.querySelectorAll('[required]');
        
        // Clear previous error messages
        form.querySelectorAll('.error-message').forEach(error => error.remove());
        form.querySelectorAll('.error').forEach(field => field.classList.remove('error'));
        
        // Validate each required field
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                showError(field, `${field.getAttribute('placeholder') || field.getAttribute('name')} is required`);
                isValid = false;
            }
            
            // Email validation
            if (field.type === 'email' && field.value.trim()) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(field.value.trim())) {
                    showError(field, 'Please enter a valid email address');
                    isValid = false;
                }
            }
            
            // Phone validation (optional)
            if (field.id === 'phone' && field.value.trim()) {
                const phonePattern = /^\d{10,15}$/;
                if (!phonePattern.test(field.value.replace(/\D/g, ''))) {
                    showError(field, 'Please enter a valid phone number');
                    isValid = false;
                }
            }
        });
        
        return isValid;
    };
    
    // Show error message
    const showError = (field, message) => {
        field.classList.add('error');
        
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        
        const formGroup = field.closest('.form-group');
        formGroup.appendChild(errorElement);
    };
    
    // Initialize live chat functionality (placeholder)
    const initLiveChat = () => {
        const chatBtn = document.querySelector('.chat-btn');
        if (chatBtn) {
            chatBtn.addEventListener('click', (e) => {
                e.preventDefault();
                alert('Live chat feature would open here.');
            });
        }
    };
    
    // Initialize Accordion for FAQ
    const initFaqAccordion = () => {
        const accordionItems = document.querySelectorAll('.accordion-item');
        accordionItems.forEach(item => {
            const header = item.querySelector('.accordion-header');
            
            header.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close all accordion items
                accordionItems.forEach(accordionItem => {
                    accordionItem.classList.remove('active');
                });
                
                // Open clicked item if it wasn't already open
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        });
    };
    
    // Initialize all functions
    animateElements();
    initContactForm();
    initLiveChat();
    initFaqAccordion();
}); 