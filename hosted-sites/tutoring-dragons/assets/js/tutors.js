/**
 * Tutors Page JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
    // Animation for various elements when they come into view
    const animateElements = () => {
        const elements = document.querySelectorAll('.tutor-card, .testimonial, .qualification');
        
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
    
    // Tutor search functionality
    const initTutorSearch = () => {
        const searchInput = document.getElementById('tutor-search');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                const searchTerm = e.target.value.toLowerCase();
                const tutorCards = document.querySelectorAll('.tutor-card');
                
                tutorCards.forEach(card => {
                    const tutorName = card.querySelector('h3').textContent.toLowerCase();
                    const tutorSubject = card.querySelector('.tutor-speciality').textContent.toLowerCase();
                    const tutorBio = card.querySelector('.tutor-bio').textContent.toLowerCase();
                    
                    if (tutorName.includes(searchTerm) || 
                        tutorSubject.includes(searchTerm) || 
                        tutorBio.includes(searchTerm)) {
                        card.style.display = 'flex';
                    } else {
                        card.style.display = 'none';
                    }
                });
                
                // Show/hide empty message
                const tutorGrid = document.querySelector('.tutor-grid');
                if (tutorGrid) {
                    const visibleCards = tutorGrid.querySelectorAll('.tutor-card[style="display: flex"]').length;
                    let noResultsMsg = tutorGrid.querySelector('.no-results');
                    
                    if (visibleCards === 0) {
                        if (!noResultsMsg) {
                            noResultsMsg = document.createElement('p');
                            noResultsMsg.classList.add('no-results');
                            noResultsMsg.textContent = 'No tutors match your search.';
                            noResultsMsg.style.textAlign = 'center';
                            noResultsMsg.style.width = '100%';
                            noResultsMsg.style.padding = '2rem';
                            tutorGrid.appendChild(noResultsMsg);
                        }
                    } else if (noResultsMsg) {
                        noResultsMsg.remove();
                    }
                }
            });
        }
    };
    
    // Subject filter functionality
    const initSubjectFilter = () => {
        const filterBtns = document.querySelectorAll('.subject-filter');
        if (filterBtns.length) {
            filterBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    // Update active button
                    filterBtns.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    
                    const subject = btn.dataset.subject;
                    const tutorCards = document.querySelectorAll('.tutor-card');
                    
                    tutorCards.forEach(card => {
                        const tutorSubject = card.querySelector('.tutor-speciality').textContent.toLowerCase();
                        
                        if (subject === 'all' || tutorSubject.includes(subject.toLowerCase())) {
                            card.style.display = 'flex';
                        } else {
                            card.style.display = 'none';
                        }
                    });
                    
                    // Show/hide empty message
                    const tutorGrid = document.querySelector('.tutor-grid');
                    if (tutorGrid) {
                        const visibleCards = tutorGrid.querySelectorAll('.tutor-card[style="display: flex"]').length;
                        let noResultsMsg = tutorGrid.querySelector('.no-results');
                        
                        if (visibleCards === 0) {
                            if (!noResultsMsg) {
                                noResultsMsg = document.createElement('p');
                                noResultsMsg.classList.add('no-results');
                                noResultsMsg.textContent = 'No tutors in this subject area.';
                                noResultsMsg.style.textAlign = 'center';
                                noResultsMsg.style.width = '100%';
                                noResultsMsg.style.padding = '2rem';
                                tutorGrid.appendChild(noResultsMsg);
                            }
                        } else if (noResultsMsg) {
                            noResultsMsg.remove();
                        }
                    }
                });
            });
        }
    };
    
    // Initialize all functions
    animateElements();
    initTutorSearch();
    initSubjectFilter();
}); 