document.addEventListener('DOMContentLoaded', () => {
    const guideDiv = document.querySelector('.guide-div');
    const logoDiv = document.querySelector('.logo-div');

    const handleScrollOrClick = () => {
        guideDiv.style.opacity = '0';
        logoDiv.style.opacity = '1';
        logoDiv.style.transform = 'translate(-50%, -50%)';
        
        // Remove event listeners after animation completes (optional)
        window.removeEventListener('scroll', handleScrollOrClick);
        document.removeEventListener('click', handleScrollOrClick);
    };

    // Listen for clicks anywhere on the document
    document.addEventListener('click', handleScrollOrClick);
});
