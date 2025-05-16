// Function to toggle dark mode
function toggleDarkMode() {
    const body = document.documentElement;
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    const button = document.querySelector('.theme-toggle');
    button.textContent = `Switch to ${currentTheme === 'dark' ? 'Dark' : 'Light'} Mode`;
}

// Function to set initial theme
function setInitialTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    const button = document.querySelector('.theme-toggle');
    button.textContent = `Switch to ${savedTheme === 'dark' ? 'Light' : 'Dark'} Mode`;
}

// Navbar hide on scroll
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

function handleScroll() {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.classList.remove('hidden');
        return;
    }
    
    if (currentScroll > lastScroll && !navbar.classList.contains('hidden')) {
        // Scrolling down
        navbar.classList.add('hidden');
    } else if (currentScroll < lastScroll && navbar.classList.contains('hidden')) {
        // Scrolling up
        navbar.classList.remove('hidden');
    }
    
    lastScroll = currentScroll;
}

// Initialize theme and scroll handlers when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    setInitialTheme();
    window.addEventListener('scroll', handleScroll, { passive: true });
}); 