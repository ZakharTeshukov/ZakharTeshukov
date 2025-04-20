/**
 * Tutors Page JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
    // Animation for tutor cards when they come into view
    const animateTutorCards = () => {
        const tutorCards = document.querySelectorAll('.tutor-card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Add staggered delay based on index
                    setTimeout(() => {
                        entry.target.classList.add('animate');
                    }, 100 * (index % 4)); // Stagger by groups of 4
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        });
        
        tutorCards.forEach(card => {
            observer.observe(card);
        });
    };
    
    // Search functionality for tutors
    const initTutorSearch = () => {
        const searchInput = document.getElementById('tutor-search');
        if (searchInput) {
            // Add clear search icon
            const searchBar = searchInput.closest('.search-bar');
            const clearIcon = document.createElement('i');
            clearIcon.classList.add('fas', 'fa-times', 'clear-search');
            clearIcon.style.display = 'none';
            searchBar.appendChild(clearIcon);
            
            // Clear search when icon is clicked
            clearIcon.addEventListener('click', () => {
                searchInput.value = '';
                clearIcon.style.display = 'none';
                searchInput.dispatchEvent(new Event('input'));
            });
            
            searchInput.addEventListener('input', (e) => {
                const searchTerm = e.target.value.toLowerCase().trim();
                
                // Toggle clear icon
                clearIcon.style.display = searchTerm ? 'block' : 'none';
                
                const tutorCards = document.querySelectorAll('.tutor-card');
                let hasResults = false;
                
                tutorCards.forEach(card => {
                    const tutorName = card.querySelector('h3').textContent.toLowerCase();
                    const tutorSpecialty = card.querySelector('.tutor-specialty').textContent.toLowerCase();
                    const tutorBio = card.querySelector('.tutor-bio').textContent.toLowerCase();
                    const subjects = Array.from(card.querySelectorAll('.subjects-taught span')).map(span => span.textContent.toLowerCase());
                    
                    if (!searchTerm || 
                        tutorName.includes(searchTerm) || 
                        tutorSpecialty.includes(searchTerm) || 
                        tutorBio.includes(searchTerm) ||
                        subjects.some(subject => subject.includes(searchTerm))) {
                        card.style.display = 'block';
                        hasResults = true;
                    } else {
                        card.style.display = 'none';
                    }
                });
                
                // Show/hide no results message
                let noResultsMsg = document.querySelector('.no-results-message');
                if (!hasResults) {
                    if (!noResultsMsg) {
                        noResultsMsg = document.createElement('div');
                        noResultsMsg.classList.add('no-results-message');
                        noResultsMsg.innerHTML = `
                            <i class="fas fa-search"></i>
                            <p>No tutors found matching "${searchTerm}"</p>
                        `;
                        document.querySelector('.tutors-list').appendChild(noResultsMsg);
                    }
                } else if (noResultsMsg) {
                    noResultsMsg.remove();
                }
            });
        }
    };
    
    // Subject filter functionality
    const initSubjectFilter = () => {
        const filterBtns = document.querySelectorAll('.tutor-filter');
        if (filterBtns.length) {
            filterBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    // Update active button
                    filterBtns.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    
                    const subject = btn.dataset.subject;
                    const tutorCards = document.querySelectorAll('.tutor-card');
                    
                    tutorCards.forEach(card => {
                        if (subject === 'all' || card.dataset.subjects === subject) {
                            card.style.display = 'block';
                            
                            // Re-trigger animation
                            card.classList.remove('animate');
                            setTimeout(() => {
                                card.classList.add('animate');
                            }, 50);
                        } else {
                            card.style.display = 'none';
                        }
                    });
                    
                    // Clear search input when changing filters
                    const searchInput = document.getElementById('tutor-search');
                    if (searchInput && searchInput.value) {
                        searchInput.value = '';
                        const clearIcon = document.querySelector('.clear-search');
                        if (clearIcon) clearIcon.style.display = 'none';
                    }
                    
                    // Remove any "no results" message
                    const noResultsMsg = document.querySelector('.no-results-message');
                    if (noResultsMsg) {
                        noResultsMsg.remove();
                    }
                });
            });
        }
    };
    
    // Initialize all functions
    animateTutorCards();
    initTutorSearch();
    initSubjectFilter();
}); 