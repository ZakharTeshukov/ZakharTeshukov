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
    
    // Initialize phone number input masking
    const initPhoneInput = () => {
        const phoneInput = document.getElementById('phone');
        if (phoneInput) {
            const formatPhoneNumber = (value) => {
                if (!value) return value;
                const phoneNumber = value.replace(/[^\d]/g, '');
                const phoneNumberLength = phoneNumber.length;
                
                if (phoneNumberLength < 4) return phoneNumber;
                if (phoneNumberLength < 7) {
                    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
                }
                return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
            };
            
            phoneInput.addEventListener('input', (e) => {
                const formattedInput = formatPhoneNumber(e.target.value);
                e.target.value = formattedInput;
            });
        }
    };
    
    // Contact form validation and submission
    const initContactForm = () => {
        const form = document.querySelector('.contact-form');
        if (form) {
            // Real-time validation
            form.querySelectorAll('input, select, textarea').forEach(field => {
                field.addEventListener('blur', () => {
                    validateField(field);
                });
                
                field.addEventListener('input', () => {
                    if (field.classList.contains('error')) {
                        validateField(field);
                    }
                });
            });
            
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                
                if (validateForm(form)) {
                    const submitBtn = form.querySelector('.submit-btn');
                    submitBtn.classList.add('loading');
                    
                    try {
                        // Simulate API call
                        await new Promise(resolve => setTimeout(resolve, 1500));
                        
                        // Show success message
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
                            setTimeout(() => formSuccess.remove(), 300);
                        }, 5000);
                    } catch (error) {
                        console.error('Error submitting form:', error);
                        showError(submitBtn, 'An error occurred. Please try again.');
                    } finally {
                        submitBtn.classList.remove('loading');
                    }
                }
            });
        }
    };
    
    // Validate individual form field
    const validateField = (field) => {
        const errorMessage = field.parentElement.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
        field.classList.remove('error');
        
        if (field.hasAttribute('required') && !field.value.trim()) {
            showError(field, `${field.getAttribute('placeholder') || field.getAttribute('name')} is required`);
            return false;
        }
        
        if (field.type === 'email' && field.value.trim()) {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(field.value.trim())) {
                showError(field, 'Please enter a valid email address');
                return false;
            }
        }
        
        if (field.id === 'phone' && field.value.trim()) {
            const phoneNumber = field.value.replace(/\D/g, '');
            if (phoneNumber.length !== 10) {
                showError(field, 'Please enter a valid 10-digit phone number');
                return false;
            }
        }
        
        return true;
    };
    
    // Form validation function
    const validateForm = (form) => {
        let isValid = true;
        const fields = form.querySelectorAll('input, select, textarea');
        
        fields.forEach(field => {
            if (!validateField(field)) {
                isValid = false;
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
        
        // Trigger animation
        requestAnimationFrame(() => {
            errorElement.classList.add('show');
        });
    };
    
    // Initialize Google Maps
    const initMap = () => {
        const mapContainer = document.querySelector('.map-container');
        if (mapContainer && window.google && window.google.maps) {
            const location = { lat: 10.7285, lng: 106.7151 }; // SSIS coordinates
            const map = new google.maps.Map(mapContainer, {
                zoom: 15,
                center: location,
                styles: [
                    {
                        featureType: 'all',
                        elementType: 'labels.text.fill',
                        stylers: [{ color: '#6c757d' }]
                    },
                    {
                        featureType: 'all',
                        elementType: 'labels.text.stroke',
                        stylers: [{ color: '#ffffff' }]
                    },
                    {
                        featureType: 'administrative',
                        elementType: 'geometry.stroke',
                        stylers: [{ color: '#dde1e4' }]
                    },
                    {
                        featureType: 'landscape',
                        elementType: 'geometry',
                        stylers: [{ color: '#f5f5f5' }]
                    },
                    {
                        featureType: 'poi',
                        elementType: 'geometry',
                        stylers: [{ color: '#eef1f3' }]
                    },
                    {
                        featureType: 'road',
                        elementType: 'geometry',
                        stylers: [{ color: '#ffffff' }]
                    },
                    {
                        featureType: 'water',
                        elementType: 'geometry',
                        stylers: [{ color: '#c5d7de' }]
                    }
                ]
            });
            
            const marker = new google.maps.Marker({
                position: location,
                map: map,
                title: 'Tutoring Dragons',
                animation: google.maps.Animation.DROP
            });
            
            const infoWindow = new google.maps.InfoWindow({
                content: `
                    <div style="padding: 10px;">
                        <h3 style="margin: 0 0 5px; color: #4a47a3;">Tutoring Dragons</h3>
                        <p style="margin: 0; color: #6c757d;">78 Nguyễn Đức Cảnh<br>Tân Phong, Quận 7<br>Hồ Chí Minh 700000, Vietnam</p>
                    </div>
                `
            });
            
            marker.addListener('click', () => {
                infoWindow.open(map, marker);
            });
        }
    };
    
    // Initialize live chat functionality
    const initLiveChat = () => {
        const chatBtn = document.querySelector('.chat-btn');
        if (chatBtn) {
            chatBtn.addEventListener('click', (e) => {
                e.preventDefault();
                // Here you would typically initialize your chat widget
                alert('Live chat feature would open here. Integration with a chat service is required.');
            });
        }
    };
    
    // Initialize FAQ Accordion
    const initFaqAccordion = () => {
        const accordionItems = document.querySelectorAll('.accordion-item');
        accordionItems.forEach(item => {
            const header = item.querySelector('.accordion-header');
            const content = item.querySelector('.accordion-content');
            
            header.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close all accordion items
                accordionItems.forEach(accordionItem => {
                    accordionItem.classList.remove('active');
                    const accordionContent = accordionItem.querySelector('.accordion-content');
                    if (accordionContent !== content) {
                        accordionContent.style.maxHeight = '0';
                    }
                });
                
                // Open clicked item if it wasn't already open
                if (!isActive) {
                    item.classList.add('active');
                    content.style.maxHeight = content.scrollHeight + 'px';
                }
            });
            
            // Add keyboard accessibility
            header.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    header.click();
                }
            });
        });
    };
    
    // Load Google Maps API
    const loadGoogleMapsAPI = () => {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap`;
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
        
        // Make initMap globally available
        window.initMap = initMap;
    };
    
    // Initialize all functions
    animateElements();
    initPhoneInput();
    initContactForm();
    initLiveChat();
    initFaqAccordion();
    loadGoogleMapsAPI();
}); 