// Handle mobile navigation
document.addEventListener('DOMContentLoaded', () => {
    // Mobile navigation setup
    const createMobileNav = () => {
        const nav = document.querySelector('.main-nav');
        const mobileMenuBtn = document.createElement('button');
        mobileMenuBtn.className = 'mobile-menu-btn';
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        
        nav.insertBefore(mobileMenuBtn, nav.firstChild);
        
        mobileMenuBtn.addEventListener('click', () => {
            const navLinks = document.querySelector('.nav-links');
            navLinks.classList.toggle('show');
            mobileMenuBtn.innerHTML = navLinks.classList.contains('show') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
    };

    if (window.innerWidth < 768) {
        createMobileNav();
    }

    window.addEventListener('resize', () => {
        if (window.innerWidth < 768 && !document.querySelector('.mobile-menu-btn')) {
            createMobileNav();
        }
    });

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

// Booking system
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

// Initialize booking system if booking elements exist
const bookingElements = document.querySelector('.booking-section');
if (bookingElements) {
    const bookingSystem = new BookingSystem();
    bookingSystem.initialize();
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

// Add animation on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.subject-card, .feature, .hero-content');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.classList.add('animate');
        }
    });
};

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Form validation helper
function validateForm(form) {
    const inputs = form.querySelectorAll('input, textarea');
    let isValid = true;

    inputs.forEach(input => {
        if (input.hasAttribute('required') && !input.value.trim()) {
            showError(input, `${input.name} is required`);
            isValid = false;
        }

        if (input.type === 'email' && input.value && !isValidEmail(input.value)) {
            showError(input, 'Please enter a valid email address');
            isValid = false;
        }
    });

    return isValid;
}

function showError(input, message) {
    const formGroup = input.parentElement;
    const error = formGroup.querySelector('.error-message') || document.createElement('div');
    error.className = 'error-message';
    error.textContent = message;
    
    if (!formGroup.querySelector('.error-message')) {
        formGroup.appendChild(error);
    }
    
    input.classList.add('error');
    
    input.addEventListener('input', () => {
        error.remove();
        input.classList.remove('error');
    }, { once: true });
}

function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}