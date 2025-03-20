document.addEventListener('DOMContentLoaded', () => {
    // Resource Search Functionality
    const searchInput = document.getElementById('resourceSearch');
    const searchButton = searchInput.nextElementSibling;
    const resourceLinks = document.querySelectorAll('.resource-link');

    const performSearch = () => {
        const searchTerm = searchInput.value.toLowerCase();
        
        resourceLinks.forEach(link => {
            const text = link.textContent.toLowerCase();
            const resourceItem = link.closest('li');
            
            if (text.includes(searchTerm)) {
                resourceItem.style.display = 'block';
            } else {
                resourceItem.style.display = 'none';
            }
        });
    };

    searchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    searchButton.addEventListener('click', performSearch);

    // Filter Tags Functionality
    const filterTags = document.querySelectorAll('.filter-tag');
    const resourceCards = document.querySelectorAll('.category-card');

    filterTags.forEach(tag => {
        tag.addEventListener('click', () => {
            // Remove active class from all tags
            filterTags.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tag
            tag.classList.add('active');

            const filter = tag.textContent.toLowerCase();

            resourceCards.forEach(card => {
                if (filter === 'all') {
                    card.style.display = 'block';
                    setTimeout(() => card.style.opacity = '1', 10);
                } else {
                    const cardType = card.querySelector('h2').textContent.toLowerCase();
                    if (cardType.includes(filter)) {
                        card.style.display = 'block';
                        setTimeout(() => card.style.opacity = '1', 10);
                    } else {
                        card.style.opacity = '0';
                        setTimeout(() => card.style.display = 'none', 300);
                    }
                }
            });
        });
    });

    // Resource Link Click Handling
    resourceLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Check if the resource requires premium membership
            const isPremium = link.classList.contains('premium');
            if (isPremium) {
                e.preventDefault();
                // Show premium membership modal or redirect to membership page
                const confirmUpgrade = confirm('This is a premium resource. Would you like to upgrade your membership?');
                if (confirmUpgrade) {
                    window.location.href = 'join.html#premium';
                }
            }
        });
    });

    // Featured Resources Image Loading
    const featuredImages = document.querySelectorAll('.featured-image img');
    featuredImages.forEach(img => {
        img.addEventListener('error', () => {
            // Replace broken image with placeholder
            img.src = '../assets/images/placeholder.jpg';
        });
    });

    // Smooth Scroll to Resource Sections
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 100;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Resource Card Hover Effects
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });

    // Download Counter for Resources
    const downloadButtons = document.querySelectorAll('.btn-primary');
    downloadButtons.forEach(button => {
        if (button.textContent.includes('Download')) {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Simulate download start
                const originalText = button.textContent;
                button.textContent = 'Downloading...';
                button.disabled = true;

                // Simulate download process
                setTimeout(() => {
                    button.textContent = originalText;
                    button.disabled = false;
                    
                    // Show success message
                    const successMessage = document.createElement('div');
                    successMessage.className = 'alert alert-success';
                    successMessage.textContent = 'Download started successfully!';
                    button.parentNode.insertBefore(successMessage, button);

                    // Remove success message after 3 seconds
                    setTimeout(() => {
                        successMessage.remove();
                    }, 3000);
                }, 1500);
            });
        }
    });

    // Resource Search History
    let searchHistory = JSON.parse(localStorage.getItem('resourceSearchHistory') || '[]');
    
    const updateSearchHistory = (term) => {
        if (term && !searchHistory.includes(term)) {
            searchHistory.unshift(term);
            if (searchHistory.length > 5) {
                searchHistory.pop();
            }
            localStorage.setItem('resourceSearchHistory', JSON.stringify(searchHistory));
        }
    };

    searchButton.addEventListener('click', () => {
        updateSearchHistory(searchInput.value);
    });

    // Add search suggestions
    const createSearchSuggestions = () => {
        const suggestionsContainer = document.createElement('div');
        suggestionsContainer.className = 'search-suggestions';
        searchInput.parentNode.appendChild(suggestionsContainer);

        searchInput.addEventListener('focus', () => {
            if (searchHistory.length > 0) {
                suggestionsContainer.style.display = 'block';
                suggestionsContainer.innerHTML = searchHistory
                    .map(term => `<div class="suggestion">${term}</div>`)
                    .join('');

                // Add click handlers for suggestions
                suggestionsContainer.querySelectorAll('.suggestion').forEach(suggestion => {
                    suggestion.addEventListener('click', () => {
                        searchInput.value = suggestion.textContent;
                        suggestionsContainer.style.display = 'none';
                        performSearch();
                    });
                });
            }
        });

        // Hide suggestions when clicking outside
        document.addEventListener('click', (e) => {
            if (!searchInput.contains(e.target) && !suggestionsContainer.contains(e.target)) {
                suggestionsContainer.style.display = 'none';
            }
        });
    };

    createSearchSuggestions();
}); 