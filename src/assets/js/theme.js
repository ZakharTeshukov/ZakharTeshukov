// Theme switcher
document.addEventListener('DOMContentLoaded', function() {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'light';
    const themeToggle = document.getElementById('theme-toggle');
    const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
    
    // Apply saved theme on initial load
    document.documentElement.classList.add(savedTheme + '-mode');
    
    // Update toggle button icon
    updateThemeIcon(savedTheme);
    
    // Handle theme toggle click
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // Handle mobile theme toggle click
    if (mobileThemeToggle) {
        mobileThemeToggle.addEventListener('click', toggleTheme);
    }
    
    // Toggle theme function
    function toggleTheme() {
        const currentTheme = localStorage.getItem('theme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        // Update localStorage
        localStorage.setItem('theme', newTheme);
        
        // Update class on html element
        document.documentElement.classList.remove(currentTheme + '-mode');
        document.documentElement.classList.add(newTheme + '-mode');
        
        // Update icon
        updateThemeIcon(newTheme);
    }
    
    // Update theme icon based on current theme
    function updateThemeIcon(theme) {
        // Create icon elements
        const moonIcon = '<i class="fas fa-moon"></i>';
        const sunIcon = '<i class="fas fa-sun"></i>';
        
        // Update desktop toggle
        if (themeToggle) {
            if (theme === 'light') {
                themeToggle.innerHTML = moonIcon;
            } else {
                themeToggle.innerHTML = sunIcon;
            }
        }
        
        // Update mobile toggle
        if (mobileThemeToggle) {
            if (theme === 'light') {
                mobileThemeToggle.innerHTML = moonIcon;
            } else {
                mobileThemeToggle.innerHTML = sunIcon;
            }
        }
    }
}); 