document.addEventListener('DOMContentLoaded', function() {
    // Tab Navigation
    const tabButtons = document.querySelectorAll('.tab-btn');
    const resumeSections = document.querySelectorAll('.resume-section');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and sections
            tabButtons.forEach(btn => btn.classList.remove('active'));
            resumeSections.forEach(section => section.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Show corresponding section
            const tabName = button.getAttribute('data-tab');
            document.getElementById(`${tabName}-section`).classList.add('active');
        });
    });
    
    // Projects Slider
    const sliderTrack = document.querySelector('.slider-track');
    const slides = document.querySelectorAll('.project-slide');
    const prevButton = document.getElementById('prev-project');
    const nextButton = document.getElementById('next-project');
    
    if (sliderTrack && slides.length > 0) {
        let currentSlide = 0;
        const slideWidth = 100; // Percentage width
        
        // Initialize slider
        function updateSlider() {
            sliderTrack.style.transform = `translateX(-${currentSlide * slideWidth}%)`;
        }
        
        // Next slide
        nextButton.addEventListener('click', () => {
            if (currentSlide < slides.length - 1) {
                currentSlide++;
                updateSlider();
            } else {
                // Loop back to first slide with animation
                sliderTrack.style.transition = 'none';
                currentSlide = 0;
                sliderTrack.style.transform = `translateX(0)`;
                
                // Force reflow
                sliderTrack.offsetHeight;
                
                // Restore transition
                sliderTrack.style.transition = 'transform 0.5s ease';
            }
        });
        
        // Previous slide
        prevButton.addEventListener('click', () => {
            if (currentSlide > 0) {
                currentSlide--;
                updateSlider();
            } else {
                // Loop to last slide with animation
                sliderTrack.style.transition = 'none';
                currentSlide = slides.length - 1;
                sliderTrack.style.transform = `translateX(-${currentSlide * slideWidth}%)`;
                
                // Force reflow
                sliderTrack.offsetHeight;
                
                // Restore transition
                sliderTrack.style.transition = 'transform 0.5s ease';
            }
        });
    }
    
    // Skill Progress Animation
    const skillProgressBars = document.querySelectorAll('.skill-progress');
    
    // Animate skill bars when they come into view
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Get width from style attribute and apply it
                const width = entry.target.style.width;
                entry.target.style.width = '0';
                
                // Trigger reflow
                entry.target.offsetWidth;
                
                // Animate to full width
                setTimeout(() => {
                    entry.target.style.width = width;
                }, 100);
                
                // Stop observing after animation
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    skillProgressBars.forEach(bar => {
        observer.observe(bar);
    });
    
    // Download Resume Feature
    const downloadButton = document.getElementById('download-resume');
    
    if (downloadButton) {
        downloadButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Create a notification element
            const notification = document.createElement('div');
            notification.classList.add('download-notification');
            notification.innerHTML = '<i class="fas fa-check-circle"></i> Resume download started';
            
            // Style the notification
            notification.style.position = 'fixed';
            notification.style.bottom = '20px';
            notification.style.right = '20px';
            notification.style.backgroundColor = 'var(--secondary-color)';
            notification.style.color = 'white';
            notification.style.padding = '12px 20px';
            notification.style.borderRadius = '4px';
            notification.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
            notification.style.zIndex = '1000';
            notification.style.display = 'flex';
            notification.style.alignItems = 'center';
            notification.style.gap = '10px';
            notification.style.opacity = '0';
            notification.style.transform = 'translateY(20px)';
            notification.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            
            // Add to the DOM
            document.body.appendChild(notification);
            
            // Show the notification
            setTimeout(() => {
                notification.style.opacity = '1';
                notification.style.transform = 'translateY(0)';
            }, 10);
            
            // Remove after 3 seconds
            setTimeout(() => {
                notification.style.opacity = '0';
                notification.style.transform = 'translateY(20px)';
                
                // Remove from DOM after animation
                setTimeout(() => {
                    document.body.removeChild(notification);
                }, 300);
            }, 3000);
            
            // In a real implementation, you would handle the actual download here
            // For example:
            // window.open('path/to/resume.pdf', '_blank');
        });
    }
    
    // Certificate Verification Feature
    const certificateVerifyButtons = document.querySelectorAll('.certificate-verify');
    
    certificateVerifyButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get certificate details
            const certificateCard = this.closest('.certificate-card');
            const certificateName = certificateCard.querySelector('h3').textContent;
            
            // Create modal element
            const modal = document.createElement('div');
            modal.classList.add('certificate-modal');
            modal.innerHTML = `
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>Certificate Verification</h3>
                        <button class="close-modal">&times;</button>
                    </div>
                    <div class="modal-body">
                        <div class="verification-icon">
                            <i class="fas fa-shield-alt"></i>
                        </div>
                        <h4>${certificateName}</h4>
                        <p>This certificate has been verified and is valid.</p>
                        <div class="verification-info">
                            <div class="info-item">
                                <span class="label">Credential ID:</span>
                                <span class="value">AB123456789</span>
                            </div>
                            <div class="info-item">
                                <span class="label">Issue Date:</span>
                                <span class="value">June 15, 2022</span>
                            </div>
                            <div class="info-item">
                                <span class="label">Expiration:</span>
                                <span class="value">No Expiration</span>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            // Style the modal
            modal.style.position = 'fixed';
            modal.style.zIndex = '1000';
            modal.style.left = '0';
            modal.style.top = '0';
            modal.style.width = '100%';
            modal.style.height = '100%';
            modal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
            modal.style.display = 'flex';
            modal.style.alignItems = 'center';
            modal.style.justifyContent = 'center';
            modal.style.opacity = '0';
            modal.style.transition = 'opacity 0.3s ease';
            
            // Style modal content
            const modalContent = modal.querySelector('.modal-content');
            modalContent.style.backgroundColor = 'white';
            modalContent.style.borderRadius = '8px';
            modalContent.style.width = '90%';
            modalContent.style.maxWidth = '500px';
            modalContent.style.maxHeight = '90vh';
            modalContent.style.overflow = 'auto';
            modalContent.style.transform = 'translateY(-20px)';
            modalContent.style.transition = 'transform 0.3s ease';
            
            // Style modal header
            const modalHeader = modal.querySelector('.modal-header');
            modalHeader.style.display = 'flex';
            modalHeader.style.justifyContent = 'space-between';
            modalHeader.style.alignItems = 'center';
            modalHeader.style.padding = '1.5rem';
            modalHeader.style.borderBottom = '1px solid #eee';
            
            // Style close button
            const closeButton = modal.querySelector('.close-modal');
            closeButton.style.background = 'none';
            closeButton.style.border = 'none';
            closeButton.style.fontSize = '1.5rem';
            closeButton.style.cursor = 'pointer';
            closeButton.style.color = '#666';
            
            // Style modal body
            const modalBody = modal.querySelector('.modal-body');
            modalBody.style.padding = '1.5rem';
            modalBody.style.textAlign = 'center';
            
            // Style verification icon
            const verificationIcon = modal.querySelector('.verification-icon');
            verificationIcon.style.fontSize = '3rem';
            verificationIcon.style.color = 'var(--secondary-color)';
            verificationIcon.style.margin = '0 0 1.5rem';
            
            // Style verification info
            const verificationInfo = modal.querySelector('.verification-info');
            verificationInfo.style.marginTop = '1.5rem';
            verificationInfo.style.backgroundColor = '#f5f5f5';
            verificationInfo.style.padding = '1rem';
            verificationInfo.style.borderRadius = '4px';
            verificationInfo.style.textAlign = 'left';
            
            // Style info items
            const infoItems = modal.querySelectorAll('.info-item');
            infoItems.forEach(item => {
                item.style.display = 'flex';
                item.style.justifyContent = 'space-between';
                item.style.padding = '0.5rem 0';
                item.style.borderBottom = '1px solid #eee';
            });
            
            // Add modal to DOM
            document.body.appendChild(modal);
            
            // Show modal with animation
            setTimeout(() => {
                modal.style.opacity = '1';
                modalContent.style.transform = 'translateY(0)';
            }, 10);
            
            // Close modal function
            function closeModal() {
                modal.style.opacity = '0';
                modalContent.style.transform = 'translateY(-20px)';
                
                // Remove from DOM after animation
                setTimeout(() => {
                    document.body.removeChild(modal);
                }, 300);
            }
            
            // Close button event
            closeButton.addEventListener('click', closeModal);
            
            // Close when clicking outside modal content
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    closeModal();
                }
            });
            
            // Close on escape key
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') {
                    closeModal();
                }
            });
        });
    });
}); 