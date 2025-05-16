document.addEventListener('DOMContentLoaded', function() {
    const searchBar = document.getElementById('search-bar');
    const resourceCards = document.querySelectorAll('.resource-card');
    const resourceSections = document.querySelectorAll('.resource-section');

    searchBar.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();

        resourceCards.forEach(card => {
            const cardTitle = card.querySelector('h3').textContent.toLowerCase();
            const cardLinks = Array.from(card.querySelectorAll('a')).map(link => link.textContent.toLowerCase());
            const isVisible = cardTitle.includes(searchTerm) || cardLinks.some(link => link.includes(searchTerm));
            
            card.style.display = isVisible ? '' : 'none';
        });

        // Hide sections that have no visible cards
        resourceSections.forEach(section => {
            const visibleCards = Array.from(section.querySelectorAll('.resource-card')).filter(card => card.style.display !== 'none');
            section.style.display = visibleCards.length > 0 ? '' : 'none';
        });
    });
}); 