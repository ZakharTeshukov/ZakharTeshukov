document.addEventListener('DOMContentLoaded', function() {
    const MAX_ITEMS_VISIBLE = 10;

    function setupPagination(listId, buttonId, viewAllUrl) {
        const listElement = document.getElementById(listId);
        const viewAllButton = document.getElementById(buttonId);

        if (!listElement || !viewAllButton) {
            // console.warn(`Pagination setup skipped: Missing list (${listId}) or button (${buttonId})`);
            return;
        }

        const items = Array.from(listElement.children).filter(child => child.tagName === 'A');

        if (items.length > MAX_ITEMS_VISIBLE) {
            for (let i = MAX_ITEMS_VISIBLE; i < items.length; i++) {
                items[i].style.display = 'none';
            }
            viewAllButton.href = viewAllUrl;
            viewAllButton.style.display = 'block'; // Or 'inline' or 'inline-block' depending on desired layout
        } else {
            viewAllButton.style.display = 'none';
        }
    }

    // Setup for each section
    // Study Materials Section
    setupPagination('review-guides-list', 'view-all-review-guides-btn', 'view-all-review-guides.html');
    setupPagination('practice-frqs-list', 'view-all-practice-frqs-btn', 'view-all-practice-frqs.html');
    setupPagination('practice-projects-list', 'view-all-practice-projects-btn', 'view-all-practice-projects.html');

    // Practice Resources Section
    setupPagination('practice-frqs-folders-list', 'view-all-practice-frqs-folders-btn', 'view-all-frq-folders.html');
    setupPagination('practice-projects-folders-list', 'view-all-practice-projects-folders-btn', 'view-all-project-folders.html');
    setupPagination('frq-rubric-list', 'view-all-frq-rubric-btn', 'view-all-frq-rubrics.html');

    // Additional Resources Section
    setupPagination('video-text-list', 'view-all-video-text-btn', 'view-all-video-texts.html');
    setupPagination('review-guides-folders-list', 'view-all-review-guides-folders-btn', 'view-all-review-guides-folders.html');
}); 