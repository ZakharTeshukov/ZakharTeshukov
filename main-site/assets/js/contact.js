/**
 * Contact Form JavaScript (contact.js)
 * ---------------------------------
 * Structure:
 * 1. Form Validation
 * 2. Form Submission
 * 3. Success/Error Handling
 * 4. Event Listeners
 */

// Constants & DOM Elements
const contactForm = document.getElementById('contactForm');
const formInputs = contactForm.querySelectorAll('input, textarea');
const submitButton = contactForm.querySelector('button[type="submit"]');
const successMessage = document.querySelector('.form-success');

/**
 * Form Validation Functions
 * ----------------------
 */

// Validate email format
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Validate form fields
const validateField = (input) => {
    const value = input.value.trim();
    const errorMessage = input.nextElementSibling;
    
    if (!value) {
        input.classList.add('error');
        errorMessage.style.display = 'block';
        return false;
    }
    
    if (input.type === 'email' && !isValidEmail(value)) {
        input.classList.add('error');
        errorMessage.style.display = 'block';
        return false;
    }
    
    input.classList.remove('error');
    errorMessage.style.display = 'none';
    return true;
};

/**
 * Form Submission Functions
 * ----------------------
 */

// Handle form submission
const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all fields
    let isValid = true;
    formInputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });
    
    if (!isValid) return;
    
    // Show loading state
    submitButton.classList.add('loading');
    
    try {
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Simulate API call (replace with actual API endpoint)
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Show success message
        showSuccessMessage();
        contactForm.reset();
    } catch (error) {
        console.error('Error submitting form:', error);
        // Handle error (show error message)
    } finally {
        submitButton.classList.remove('loading');
    }
};

/**
 * Success/Error Handling
 * -------------------
 */

// Show success message
const showSuccessMessage = () => {
    successMessage.classList.add('show');
    setTimeout(() => {
        successMessage.classList.remove('show');
    }, 5000);
};

/**
 * Event Listeners
 * -------------
 */

// Initialize event listeners
const initEventListeners = () => {
    // Form submission
    contactForm.addEventListener('submit', handleSubmit);
    
    // Real-time validation
    formInputs.forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => {
            if (input.classList.contains('error')) {
                validateField(input);
            }
        });
    });
    
    // Close success message
    const closeButton = successMessage.querySelector('button');
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            successMessage.classList.remove('show');
        });
    }
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initEventListeners); 