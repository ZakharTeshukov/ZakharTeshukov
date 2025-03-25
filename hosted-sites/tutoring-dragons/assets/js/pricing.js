/**
 * Pricing Page JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
    // Animation for elements when they come into view
    const animateElements = () => {
        const elements = document.querySelectorAll('.pricing-card, .option-card, .accordion-item');
        
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
    
    // Pricing toggle functionality
    const initPricingToggle = () => {
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
    };
    
    // Accordion functionality
    const initAccordion = () => {
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
    
    // Price calculator functionality (if needed)
    const initPriceCalculator = () => {
        const calculator = document.getElementById('price-calculator');
        if (calculator) {
            const hoursInput = calculator.querySelector('#hours-input');
            const subjectsInput = calculator.querySelector('#subjects-input');
            const calculateBtn = calculator.querySelector('#calculate-btn');
            const totalOutput = calculator.querySelector('#total-price');
            
            calculateBtn.addEventListener('click', () => {
                const hours = parseInt(hoursInput.value) || 0;
                const subjects = parseInt(subjectsInput.value) || 1;
                let baseRate = 25; // Base hourly rate
                
                // Apply discount for more hours
                let rate = baseRate;
                if (hours > 20) {
                    rate = baseRate * 0.8; // 20% discount for 20+ hours
                } else if (hours > 10) {
                    rate = baseRate * 0.9; // 10% discount for 10+ hours
                }
                
                // Add subject premium
                const subjectMultiplier = 1 + ((subjects - 1) * 0.1); // 10% more per additional subject
                
                const total = Math.round(hours * rate * subjectMultiplier);
                
                totalOutput.textContent = `$${total}`;
                totalOutput.parentElement.style.display = 'block';
            });
        }
    };
    
    // Initialize all functions
    animateElements();
    initPricingToggle();
    initAccordion();
    initPriceCalculator();
}); 