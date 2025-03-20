/**
 * Contact Form JavaScript
 * Handles form validation, animations, and submission
 */
document.addEventListener('DOMContentLoaded', function() {
    // Get form elements
    const contactForm = document.getElementById('contactForm');
    const formInputs = contactForm.querySelectorAll('input, textarea');
    const submitButton = contactForm.querySelector('.submit-btn');
    const formSuccess = contactForm.querySelector('.form-success');
    const closeButton = formSuccess.querySelector('button');

    // Input focus effects
    formInputs.forEach(input => {
        // Add focus class to parent when input is focused
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });

        // Remove focus class when input is blurred
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
            
            // Validate on blur
            validateInput(this);
        });

        // Add animation class when the page loads
        setTimeout(() => {
            input.parentElement.classList.add('fade-in');
        }, 300);
    });

    // Validate form input
    function validateInput(input) {
        const formGroup = input.parentElement;
        
        if (input.validity.valid && input.value !== '') {
            formGroup.classList.remove('error');
            return true;
        } else {
            if (input.value === '') {
                formGroup.classList.add('error');
            }
            return false;
        }
    }

    // Email validation with regex
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Handle form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate all inputs
        let isValid = true;
        formInputs.forEach(input => {
            if (!validateInput(input)) {
                isValid = false;
            }
            
            // Additional email validation
            if (input.type === 'email' && !validateEmail(input.value)) {
                input.parentElement.classList.add('error');
                isValid = false;
            }
        });
        
        // If form is valid, submit it
        if (isValid) {
            submitForm();
        }
    });

    // Submit form function
    function submitForm() {
        // Add loading state
        submitButton.classList.add('loading');
        submitButton.disabled = true;
        
        // Simulate server request (replace with actual form submission)
        setTimeout(() => {
            // Hide loading state
            submitButton.classList.remove('loading');
            submitButton.disabled = false;
            
            // Show success message
            formSuccess.classList.add('show');
            
            // Reset form
            contactForm.reset();
            formInputs.forEach(input => {
                input.parentElement.classList.remove('focused');
            });
        }, 1500);
    }

    // Close success message
    closeButton.addEventListener('click', function() {
        formSuccess.classList.remove('show');
    });
    
    // Add floating labels effect
    formInputs.forEach(input => {
        // Check if input already has value (e.g. on page refresh)
        if (input.value !== '') {
            input.parentElement.classList.add('focused');
        }
    });
});

// Map elements (if using a map)
function initMap() {
    // This function would be used if adding a Google Map to the contact page
} 