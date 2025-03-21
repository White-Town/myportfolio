// Theme switching functionality
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.querySelector('.theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    // Theme toggle handler
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
        console.log('Theme switched to:', newTheme); // Debug log
    });
    
    // Update theme icon based on current theme
    function updateThemeIcon(theme) {
        themeIcon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
        console.log('Icon updated to:', themeIcon.className); // Debug log
    }
    
    // Debug log
    console.log('Theme script loaded, current theme:', savedTheme);
});
