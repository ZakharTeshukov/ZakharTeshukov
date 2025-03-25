/**
 * Main JavaScript - Contains general utility functions used across all pages
 */

// Handle mobile navigation
document.addEventListener('DOMContentLoaded', () => {
    // Initialize subject filters if they exist
    const subjectFilters = document.querySelector('.subject-filters');
    if (subjectFilters) {
        initializeSubjectFilters();
    }

    // Initialize tutor search if it exists
    const tutorSearch = document.querySelector('.tutor-search');
    if (tutorSearch) {
        initializeTutorSearch();
    }
});

// Subject filtering system
function initializeSubjectFilters() {
    const filters = document.querySelectorAll('.subject-filter');
    const tutors = document.querySelectorAll('.tutor-card');

    filters.forEach(filter => {
        filter.addEventListener('click', () => {
            const subject = filter.dataset.subject;
            
            // Update active filter
            filters.forEach(f => f.classList.remove('active'));
            filter.classList.add('active');
            
            // Filter tutors
            tutors.forEach(tutor => {
                if (subject === 'all' || tutor.dataset.subjects.includes(subject)) {
                    tutor.style.display = 'block';
                } else {
                    tutor.style.display = 'none';
                }
            });
        });
    });
}

// Tutor search functionality
function initializeTutorSearch() {
    const searchInput = document.querySelector('.tutor-search input');
    const tutors = document.querySelectorAll('.tutor-card');

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();

        tutors.forEach(tutor => {
            const tutorName = tutor.querySelector('.tutor-name').textContent.toLowerCase();
            const tutorSubjects = tutor.dataset.subjects.toLowerCase();
            
            if (tutorName.includes(searchTerm) || tutorSubjects.includes(searchTerm)) {
                tutor.style.display = 'block';
            } else {
                tutor.style.display = 'none';
            }
        });
    });
}

// Form validation helper
function validateForm(form) {
    const inputs = form.querySelectorAll('input, textarea, select');
    let isValid = true;

    // Clear previous error messages
    form.querySelectorAll('.error-message').forEach(error => error.remove());
    form.querySelectorAll('.error').forEach(field => field.classList.remove('error'));

    inputs.forEach(input => {
        if (input.hasAttribute('required') && !input.value.trim()) {
            showError(input, `${input.getAttribute('placeholder') || input.getAttribute('name')} is required`);
            isValid = false;
        }

        if (input.type === 'email' && input.value.trim()) {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(input.value.trim())) {
                showError(input, 'Please enter a valid email address');
                isValid = false;
            }
        }
        
        // Phone validation
        if (input.id === 'phone' && input.value.trim()) {
            const phonePattern = /^\d{10,15}$/;
            if (!phonePattern.test(input.value.replace(/\D/g, ''))) {
                showError(input, 'Please enter a valid phone number');
                isValid = false;
            }
        }
    });

    return isValid;
}

function showError(input, message) {
    input.classList.add('error');
    
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    
    const formGroup = input.closest('.form-group');
    if (formGroup) {
        formGroup.appendChild(errorElement);
    } else {
        input.insertAdjacentElement('afterend', errorElement);
    }
    
    input.addEventListener('input', () => {
        const errorMsg = input.parentElement.querySelector('.error-message');
        if (errorMsg) errorMsg.remove();
        input.classList.remove('error');
    }, { once: true });
}

// Booking system class (can be used on booking pages)
class BookingSystem {
    constructor() {
        this.selectedDate = null;
        this.selectedTime = null;
        this.selectedTutor = null;
    }

    initialize() {
        this.initializeDatePicker();
        this.initializeTimeSlots();
        this.initializeBookingForm();
    }

    initializeDatePicker() {
        // Simple date picker implementation
        const dateInputs = document.querySelectorAll('.date-picker input[type="date"]');
        dateInputs.forEach(input => {
            input.addEventListener('change', (e) => {
                this.selectedDate = e.target.value;
                this.updateAvailableTimeSlots();
            });
        });
    }

    initializeTimeSlots() {
        const timeSlots = document.querySelectorAll('.time-slot');
        timeSlots.forEach(slot => {
            slot.addEventListener('click', (e) => {
                timeSlots.forEach(s => s.classList.remove('selected'));
                slot.classList.add('selected');
                this.selectedTime = slot.dataset.time;
            });
        });
    }

    updateAvailableTimeSlots() {
        // This would typically fetch available slots from a server
        // For now, we'll just simulate it
        const timeSlots = document.querySelectorAll('.time-slot');
        timeSlots.forEach(slot => {
            slot.classList.remove('unavailable');
            if (Math.random() > 0.7) { // Randomly make some slots unavailable
                slot.classList.add('unavailable');
            }
        });
    }

    initializeBookingForm() {
        const bookingForm = document.querySelector('.booking-form');
        if (bookingForm) {
            bookingForm.addEventListener('submit', (e) => {
                e.preventDefault();
                if (this.validateBooking()) {
                    this.submitBooking();
                }
            });
        }
    }

    validateBooking() {
        if (!this.selectedDate || !this.selectedTime) {
            alert('Please select both a date and time for your session.');
            return false;
        }
        return true;
    }

    submitBooking() {
        // This would typically send the booking to a server
        const bookingDetails = {
            date: this.selectedDate,
            time: this.selectedTime,
            tutor: this.selectedTutor
        };
        
        console.log('Booking submitted:', bookingDetails);
        alert('Thank you for your booking! We will confirm your session shortly.');
    }
}

// Initialize booking system if the relevant elements exist
document.addEventListener('DOMContentLoaded', () => {
    const bookingElements = document.querySelector('.booking-section');
    if (bookingElements) {
        const bookingSystem = new BookingSystem();
        bookingSystem.initialize();
    }

    // Add scroll animation for elements
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.subject-card, .feature, .subject-item, .tutor-card, .testimonial, .pricing-card, .option-card');
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight * 0.9 && elementBottom > 0) {
                element.style.opacity = '1';
                element.style.transform = element.classList.contains('popular') 
                    ? 'scale(1.05)' 
                    : 'translateY(0)';
            }
        });
    };

    // Initialize element states
    document.querySelectorAll('.subject-card, .feature, .subject-item, .tutor-card, .testimonial, .pricing-card:not(.popular), .option-card').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
    });
    
    // Initialize popular pricing cards differently
    document.querySelectorAll('.pricing-card.popular').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px) scale(1.05)';
        element.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
    });

    // Add scroll event listener
    window.addEventListener('scroll', animateOnScroll);
    // Initial check for elements in view
    animateOnScroll();

    // Add hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('.subject-card, .feature, .cta-button, .category-box, .testimonial');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            if (element.classList.contains('pricing-card') && element.classList.contains('popular')) {
                element.style.transform = 'translateY(-5px) scale(1.05)';
            } else {
                element.style.transform = 'translateY(-5px)';
            }
        });
        element.addEventListener('mouseleave', () => {
            if (element.classList.contains('pricing-card') && element.classList.contains('popular')) {
                element.style.transform = 'scale(1.05)';
            } else {
                element.style.transform = 'translateY(0)';
            }
        });
    });
    
    // Pricing toggle functionality
    const toggleButtons = document.querySelectorAll('.toggle-btn');
    if (toggleButtons.length > 0) {
        const monthlyPlans = document.querySelector('.monthly-plans');
        const semesterPlans = document.querySelector('.semester-plans');
        
        toggleButtons.forEach(button => {
            button.addEventListener('click', () => {
                toggleButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                const plan = button.getAttribute('data-plan');
                if (plan === 'monthly') {
                    monthlyPlans.style.display = 'grid';
                    semesterPlans.style.display = 'none';
                } else if (plan === 'semester') {
                    monthlyPlans.style.display = 'none';
                    semesterPlans.style.display = 'grid';
                }
            });
        });
    }
    
    // Accordion functionality
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

// Add scroll animation for elements
// This is a general function that can be used by page-specific scripts if needed
function animateOnScroll(selector = '.animate-on-scroll') {
    const elements = document.querySelectorAll(selector);
    
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
    
    elements.forEach(element => {
        observer.observe(element);
    });
}

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', () => {
    // Add mobile menu button to the navigation
    const nav = document.querySelector('.main-nav');
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    
    if (mobileBtn) {
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
                // Close mobile menu if open
                if (mobileBtn && navLinks) {
                    navLinks.classList.remove('active');
                    mobileBtn.innerHTML = '<i class="fas fa-bars"></i>';
                }
            }
        });
    });

    // Add scroll animation for elements
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.subject-card, .feature, .subject-item, .tutor-card, .testimonial, .pricing-card, .option-card');
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight * 0.9 && elementBottom > 0) {
                element.style.opacity = '1';
                element.style.transform = element.classList.contains('popular') 
                    ? 'scale(1.05)' 
                    : 'translateY(0)';
            }
        });
    };

    // Initialize element states
    document.querySelectorAll('.subject-card, .feature, .subject-item, .tutor-card, .testimonial, .pricing-card:not(.popular), .option-card').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
    });
    
    // Initialize popular pricing cards differently
    document.querySelectorAll('.pricing-card.popular').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px) scale(1.05)';
        element.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
    });

    // Add scroll event listener
    window.addEventListener('scroll', animateOnScroll);
    // Initial check for elements in view
    animateOnScroll();

    // Add hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('.subject-card, .feature, .cta-button, .category-box, .testimonial');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            if (element.classList.contains('pricing-card') && element.classList.contains('popular')) {
                element.style.transform = 'translateY(-5px) scale(1.05)';
            } else {
                element.style.transform = 'translateY(-5px)';
            }
        });
        element.addEventListener('mouseleave', () => {
            if (element.classList.contains('pricing-card') && element.classList.contains('popular')) {
                element.style.transform = 'scale(1.05)';
            } else {
                element.style.transform = 'translateY(0)';
            }
        });
    });
    
    // Pricing toggle functionality
    const toggleButtons = document.querySelectorAll('.toggle-btn');
    if (toggleButtons.length > 0) {
        const monthlyPlans = document.querySelector('.monthly-plans');
        const semesterPlans = document.querySelector('.semester-plans');
        
        toggleButtons.forEach(button => {
            button.addEventListener('click', () => {
                toggleButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                const plan = button.getAttribute('data-plan');
                if (plan === 'monthly') {
                    monthlyPlans.style.display = 'grid';
                    semesterPlans.style.display = 'none';
                } else if (plan === 'semester') {
                    monthlyPlans.style.display = 'none';
                    semesterPlans.style.display = 'grid';
                }
            });
        });
    }
    
    // Accordion functionality
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
}); 