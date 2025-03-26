/**
 * Subjects Page JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
    // Animation for subject items when they come into view with staggered delay
    const animateSubjectItems = () => {
        const subjectItems = document.querySelectorAll('.subject-item');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Add staggered delay based on index within the category
                    setTimeout(() => {
                        entry.target.classList.add('animate');
                    }, 100 * (index % 4)); // Stagger by groups of 4 items
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
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
                // Trigger the input event to update the display
                searchInput.dispatchEvent(new Event('input'));
            });
            
            searchInput.addEventListener('input', (e) => {
                const searchTerm = e.target.value.toLowerCase().trim();
                
                // Toggle clear icon
                clearIcon.style.display = searchTerm ? 'block' : 'none';
                
                const subjectItems = document.querySelectorAll('.subject-item');
                let hasResults = false;
                
                subjectItems.forEach(item => {
                    const subjectTitle = item.querySelector('h3').textContent.toLowerCase();
                    const subjectDesc = item.querySelector('p').textContent.toLowerCase();
                    
                    if (!searchTerm || subjectTitle.includes(searchTerm) || subjectDesc.includes(searchTerm)) {
                        item.style.display = 'flex';
                        hasResults = true;
                    } else {
                        item.style.display = 'none';
                    }
                });
                
                // Show/hide empty message for categories
                document.querySelectorAll('.subject-category').forEach(category => {
                    const visibleItems = Array.from(category.querySelectorAll('.subject-item')).filter(item => 
                        item.style.display !== 'none'
                    ).length;
                    
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
                    
                    // If we're searching, show all categories that have results
                    // Otherwise, respect the current filter
                    if (searchTerm) {
                        category.style.display = visibleItems > 0 ? 'block' : 'none';
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
                            
                            // Re-trigger animations for newly visible items
                            const items = cat.querySelectorAll('.subject-item');
                            items.forEach((item, index) => {
                                item.classList.remove('animate');
                                setTimeout(() => {
                                    item.classList.add('animate');
                                }, 50 * index);
                            });
                        } else {
                            cat.style.display = 'none';
                        }
                    });
                    
                    // Clear search input when changing category
                    const searchInput = document.getElementById('subject-search');
                    if (searchInput && searchInput.value) {
                        searchInput.value = '';
                        const clearIcon = document.querySelector('.clear-search');
                        if (clearIcon) clearIcon.style.display = 'none';
                        
                        // Reset display of all items in visible categories
                        document.querySelectorAll('.subject-category[style="display: block"] .subject-item').forEach(item => {
                            item.style.display = 'flex';
                        });
                        
                        // Remove any "no results" messages
                        document.querySelectorAll('.no-results').forEach(msg => msg.remove());
                    }
                });
            });
        }
    };
    
    // Add subtle hover effect to subject categories
    const initHoverEffects = () => {
        const categories = document.querySelectorAll('.subject-category');
        categories.forEach(category => {
            category.addEventListener('mouseenter', () => {
                // Add subtle highlight to current category
                categories.forEach(c => {
                    if (c !== category) {
                        c.style.opacity = '0.8';
                    }
                });
            });
            
            category.addEventListener('mouseleave', () => {
                // Reset all categories
                categories.forEach(c => {
                    c.style.opacity = '1';
                });
            });
        });
    };
    
    // Initialize all functions
    animateSubjectItems();
    initSubjectSearch();
    initCategoryFilter();
    initHoverEffects();
}); 