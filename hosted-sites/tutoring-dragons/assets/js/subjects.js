/**
 * Subjects Page JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
    // Animation for subject items when they come into view
    const animateSubjectItems = () => {
        const subjectItems = document.querySelectorAll('.subject-item');
        
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
        
        subjectItems.forEach(item => {
            observer.observe(item);
        });
    };
    
    // Search functionality for subjects
    const initSubjectSearch = () => {
        const searchInput = document.getElementById('subject-search');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                const searchTerm = e.target.value.toLowerCase();
                const subjectItems = document.querySelectorAll('.subject-item');
                
                subjectItems.forEach(item => {
                    const subjectTitle = item.querySelector('h3').textContent.toLowerCase();
                    const subjectDesc = item.querySelector('p').textContent.toLowerCase();
                    
                    if (subjectTitle.includes(searchTerm) || subjectDesc.includes(searchTerm)) {
                        item.style.display = 'flex';
                    } else {
                        item.style.display = 'none';
                    }
                });
                
                // Show/hide empty message for categories
                document.querySelectorAll('.subject-category').forEach(category => {
                    const visibleItems = category.querySelectorAll('.subject-item[style="display: flex"]').length;
                    const noResultsMsg = category.querySelector('.no-results') || document.createElement('p');
                    
                    if (visibleItems === 0) {
                        if (!category.querySelector('.no-results')) {
                            noResultsMsg.classList.add('no-results');
                            noResultsMsg.textContent = 'No subjects match your search.';
                            category.querySelector('.subject-grid').appendChild(noResultsMsg);
                        }
                    } else {
                        const existingMsg = category.querySelector('.no-results');
                        if (existingMsg) {
                            existingMsg.remove();
                        }
                    }
                });
            });
        }
    };
    
    // Subject category filter
    const initCategoryFilter = () => {
        const filterBtns = document.querySelectorAll('.subject-filter');
        if (filterBtns.length) {
            filterBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    // Update active button
                    filterBtns.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    
                    const category = btn.dataset.category;
                    const categories = document.querySelectorAll('.subject-category');
                    
                    categories.forEach(cat => {
                        if (category === 'all' || cat.dataset.category === category) {
                            cat.style.display = 'block';
                        } else {
                            cat.style.display = 'none';
                        }
                    });
                });
            });
        }
    };
    
    // Initialize all functions
    animateSubjectItems();
    initSubjectSearch();
    initCategoryFilter();
}); 