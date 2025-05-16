// Check for saved theme preference, otherwise use system preference
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
const currentTheme = localStorage.getItem('theme');

if (currentTheme === 'dark' || (!currentTheme && prefersDarkScheme.matches)) {
    document.body.setAttribute('data-theme', 'dark');
    updateToggleButton('Switch to Light Mode');
} else {
    document.body.setAttribute('data-theme', 'light');
    updateToggleButton('Switch to Dark Mode');
}

function toggleDarkMode() {
    const currentTheme = document.body.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    updateToggleButton(`Switch to ${newTheme === 'light' ? 'Dark' : 'Light'} Mode`);
}

function updateToggleButton(text) {
    const button = document.querySelector('.theme-toggle');
    if (button) {
        button.textContent = text;
    }
}

// Listen for system theme changes
prefersDarkScheme.addEventListener('change', (e) => {
    const newTheme = e.matches ? 'dark' : 'light';
    // Only update if user hasn't manually set a preference
    if (!localStorage.getItem('theme')) {
        document.body.setAttribute('data-theme', newTheme);
        updateToggleButton(`Switch to ${newTheme === 'light' ? 'Dark' : 'Light'} Mode`);
    }
});

// Navbar hide on scroll
let lastScroll = 0;
function handleScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    const currentScroll = window.pageYOffset;
    if (currentScroll <= 0) {
        navbar.classList.remove('hidden');
        return;
    }
    if (currentScroll > lastScroll && !navbar.classList.contains('hidden')) {
        navbar.classList.add('hidden');
    } else if (currentScroll < lastScroll && navbar.classList.contains('hidden')) {
        navbar.classList.remove('hidden');
    }
    lastScroll = currentScroll;
}

// Homepage Search/Filter
function handleSearch() {
    const searchBar = document.getElementById('search-bar');
    if (!searchBar) return;

    const filterText = searchBar.value.toLowerCase();
    const unitCards = document.querySelectorAll('.unit-grid .unit-card');

    unitCards.forEach(card => {
        const titleElement = card.querySelector('h3');
        if (titleElement) {
            const title = titleElement.textContent.toLowerCase();
            if (title.includes(filterText)) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        }
    });
}

// Copy to Clipboard for Code Blocks
function initializeCopyCodeButtons() {
    const codeBlocks = document.querySelectorAll('pre');
    codeBlocks.forEach((block, index) => {
        const existingButton = block.querySelector('.copy-code-button');
        if (existingButton) return; // Avoid adding multiple buttons

        const button = document.createElement('button');
        button.className = 'copy-code-button';
        button.textContent = 'Copy';
        button.setAttribute('aria-label', 'Copy code to clipboard');
        
        button.addEventListener('click', async () => {
            const code = block.querySelector('code');
            if (code) {
                try {
                    await navigator.clipboard.writeText(code.innerText);
                    button.textContent = 'Copied!';
                    button.classList.add('copied');
                    setTimeout(() => {
                        button.textContent = 'Copy';
                        button.classList.remove('copied');
                    }, 2000);
                } catch (err) {
                    console.error('Failed to copy text: ', err);
                    button.textContent = 'Error';
                    setTimeout(() => {
                        button.textContent = 'Copy';
                    }, 2000);
                }
            }
        });
        block.appendChild(button);
    });
}

// Mobile Navigation Toggle
function initializeMobileNavToggle() {
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const navigationMenu = document.querySelector('.navigation-menu');

    if (mobileNavToggle && navigationMenu) {
        mobileNavToggle.addEventListener('click', () => {
            const isExpanded = mobileNavToggle.getAttribute('aria-expanded') === 'true' || false;
            mobileNavToggle.setAttribute('aria-expanded', !isExpanded);
            navigationMenu.classList.toggle('active');
            
            // Optional: Close open dropdowns when mobile nav is closed
            if (!navigationMenu.classList.contains('active')) {
                const openDropdowns = navigationMenu.querySelectorAll('.dropdown.open');
                openDropdowns.forEach(dropdown => {
                    dropdown.classList.remove('open');
                    const submenu = dropdown.querySelector('.dropdown-menu');
                    if (submenu) submenu.style.display = 'none'; // Ensure it's hidden
                });
            }
        });

        // Handle dropdown toggles in mobile view
        const dropdownToggles = navigationMenu.querySelectorAll('.dropdown > span');
        dropdownToggles.forEach(toggle => {
            toggle.addEventListener('click', (e) => {
                if (window.innerWidth <= 992) { // Only apply click toggle on mobile
                    const parentDropdown = toggle.parentElement;
                    parentDropdown.classList.toggle('open');
                    const submenu = parentDropdown.querySelector('.dropdown-menu');
                    if (submenu) {
                        submenu.style.display = parentDropdown.classList.contains('open') ? 'block' : 'none';
                    }
                    e.stopPropagation(); // Prevent closing nav if clicking inside
                }
            });
        });
    }
}

// Initialize all functionalities when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    setInitialTheme();
    window.addEventListener('scroll', handleScroll, { passive: true });

    const searchBar = document.getElementById('search-bar');
    if (searchBar) {
        searchBar.addEventListener('keyup', handleSearch);
    }
    
    initializeCopyCodeButtons();
    initializeMobileNavToggle(); // Initialize mobile nav
}); 