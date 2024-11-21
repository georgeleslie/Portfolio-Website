document.addEventListener("DOMContentLoaded", function () {
    // Declare `menu` and `navbar`
    const menu = document.querySelector('#icon-hamburger');
    const navbar = document.querySelector('.navbar');

    // Toggle hamburger menu for mobile
    if (menu) {
        menu.onclick = () => {
            menu.classList.toggle('bx-x');
            navbar.classList.toggle('open');
        };
    }

    // Close the menu if clicking outside (for mobile)
    window.onclick = (e) => {
        if (!navbar.contains(e.target) && !menu.contains(e.target)) {
            navbar.classList.remove('open');
            menu.classList.remove('bx-x');
        }
    };
});
