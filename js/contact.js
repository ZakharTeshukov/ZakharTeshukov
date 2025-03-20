document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.querySelector('.form-success');
    const submitBtn = contactForm.querySelector('.submit-btn');
    
    // Form validation
    const validateField = (field, errorId) => {
        const errorElement = document.getElementById(errorId);
        let isValid = true;
        
        if (!field.value.trim()) {
            errorElement.style.display = 'block';
            field.style.borderColor = '#dc2626';
            isValid = false;
        } else {
            errorElement.style.display = 'none';
            field.style.borderColor = '#eee';
            
            // Additional email validation
            if (field.type === 'email') {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(field.value)) {
                    errorElement.style.display = 'block';
                    field.style.borderColor = '#dc2626';
                    isValid = false;
                }
            }
        }
        
        return isValid;
    };
    
    // Form submission handler
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form fields
        const nameField = document.getElementById('name');
        const emailField = document.getElementById('email');
        const subjectField = document.getElementById('subject');
        const messageField = document.getElementById('message');
        
        // Validate all fields
        const isNameValid = validateField(nameField, 'nameError');
        const isEmailValid = validateField(emailField, 'emailError');
        const isSubjectValid = validateField(subjectField, 'subjectError');
        const isMessageValid = validateField(messageField, 'messageError');
        
        // If all fields are valid, proceed with form submission
        if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
            // Show loading state
            submitBtn.disabled = true;
            submitBtn.querySelector('.spinner').style.display = 'inline-block';
            submitBtn.querySelector('i').style.display = 'none';
            
            try {
                // Simulate form submission (replace with actual API call)
                await new Promise(resolve => setTimeout(resolve, 2000));
                
                // Show success message
                contactForm.reset();
                formSuccess.style.display = 'block';
                contactForm.style.display = 'none';
                
            } catch (error) {
                console.error('Error submitting form:', error);
                alert('An error occurred. Please try again later.');
                
            } finally {
                // Reset button state
                submitBtn.disabled = false;
                submitBtn.querySelector('.spinner').style.display = 'none';
                submitBtn.querySelector('i').style.display = 'inline-block';
            }
        }
    });
    
    // Reset form after successful submission
    window.resetForm = () => {
        formSuccess.style.display = 'none';
        contactForm.style.display = 'flex';
        contactForm.reset();
    };
    
    // Real-time validation
    const fields = ['name', 'email', 'subject', 'message'];
    fields.forEach(field => {
        const input = document.getElementById(field);
        input.addEventListener('input', () => {
            validateField(input, `${field}Error`);
        });
        
        // Add focus effects
        input.addEventListener('focus', () => {
            input.style.borderColor = '#000';
        });
        
        input.addEventListener('blur', () => {
            if (!input.value.trim()) {
                input.style.borderColor = '#eee';
            }
        });
    });
}); 