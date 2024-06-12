document.addEventListener('DOMContentLoaded', () => {
    const guideDiv = document.querySelector('.guide-div');
    const logoDiv = document.querySelector('.logo-div');
    const triangle = document.getElementById('triangle');

    const handleScrollOrClick = (event) => {
        if (event.type === 'click' || window.scrollY > 50) {
            guideDiv.style.opacity = '0';
            logoDiv.style.opacity = '1';
            logoDiv.style.transform = 'translate(-50%, -50%)';
        }
    };

    window.addEventListener('scroll', handleScrollOrClick);
    triangle.addEventListener('click', handleScrollOrClick);
});
