document.addEventListener('DOMContentLoaded', () => {
    // Form validation and submission
    const contactForm = document.querySelector('.contact-form');
    const successMessage = document.querySelector('.success-message');

    const validateEmail = (email) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    const validateForm = (formData) => {
        let isValid = true;
        const errors = {};

        // Clear previous error messages
        document.querySelectorAll('.error-message').forEach(msg => msg.remove());
        document.querySelectorAll('.error').forEach(field => field.classList.remove('error'));

        // Validate Full Name
        if (!formData.get('fullName').trim()) {
            isValid = false;
            errors.fullName = 'Full name is required';
        }

        // Validate Email
        if (!validateEmail(formData.get('email'))) {
            isValid = false;
            errors.email = 'Please enter a valid email address';
        }

        // Validate Subject
        if (!formData.get('subject').trim()) {
            isValid = false;
            errors.subject = 'Subject is required';
        }

        // Validate Message
        if (!formData.get('message').trim()) {
            isValid = false;
            errors.message = 'Message is required';
        }

        // Display error messages
        Object.keys(errors).forEach(fieldName => {
            const field = contactForm.querySelector(`[name="${fieldName}"]`);
            field.classList.add('error');
            
            const errorMessage = document.createElement('div');
            errorMessage.className = 'error-message';
            errorMessage.textContent = errors[fieldName];
            field.parentNode.appendChild(errorMessage);
        });

        return isValid;
    };

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(contactForm);

        if (validateForm(formData)) {
            try {
                // Simulate form submission (replace with actual API endpoint)
                await new Promise(resolve => setTimeout(resolve, 1000));

                // Show success message
                successMessage.style.display = 'block';
                contactForm.reset();

                // Hide success message after 5 seconds
                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 5000);
            } catch (error) {
                console.error('Error submitting form:', error);
                alert('An error occurred. Please try again later.');
            }
        }
    });

    // FAQ Accordion functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('h3');
        const answer = item.querySelector('p');
        
        // Initially hide all answers except the first one
        if (item !== faqItems[0]) {
            answer.style.display = 'none';
        }
        
        question.addEventListener('click', () => {
            const isOpen = answer.style.display === 'block';
            
            // Close all other answers
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.querySelector('p').style.display = 'none';
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current answer
            answer.style.display = isOpen ? 'none' : 'block';
            item.classList.toggle('active', !isOpen);
        });
    });

    // Google Maps initialization (replace with actual API key and coordinates)
    function initMap() {
        const mapElement = document.getElementById('map');
        if (mapElement) {
            const location = { lat: YOUR_LATITUDE, lng: YOUR_LONGITUDE };
            const map = new google.maps.Map(mapElement, {
                zoom: 15,
                center: location,
                styles: [
                    {
                        "featureType": "all",
                        "elementType": "geometry",
                        "stylers": [{"color": "#242f3e"}]
                    },
                    // Add more custom styles as needed
                ]
            });

            const marker = new google.maps.Marker({
                position: location,
                map: map,
                title: 'Global Debate Society'
            });
        }
    }

    // Load Google Maps API (uncomment and add your API key when ready)
    /*
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
    */

    // Smooth scroll for navigation links
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

    // Form field animations
    const formFields = document.querySelectorAll('.form-group input, .form-group textarea');
    
    formFields.forEach(field => {
        field.addEventListener('focus', () => {
            field.parentElement.classList.add('focused');
        });
        
        field.addEventListener('blur', () => {
            if (!field.value) {
                field.parentElement.classList.remove('focused');
            }
        });
    });
}); 