document.addEventListener("DOMContentLoaded", function () {
    // Declare `menu` and `navbar`
    let menu = document.querySelector('#icon-hamburger');
    let navbar = document.querySelector('.navbar');
    let dropdowns = document.querySelectorAll('.dropdown');

    // Toggle hamburger menu for mobile
    menu.onclick = () => {
        menu.classList.toggle('bx-x');
        navbar.classList.toggle('open');
    };

    // Handle dropdowns for mobile (Click behavior)
    dropdowns.forEach(dropdown => {
        let dropdownToggle = dropdown.querySelector('a');

        dropdownToggle.onclick = (e) => {
            // Prevent default link behavior and stop propagation
            e.preventDefault();
            e.stopPropagation();

            // Toggle 'open' class to show/hide the dropdown on mobile
            dropdown.classList.toggle('open');
        };
    });

    // Close dropdowns if clicking outside (for mobile)
    window.onclick = (e) => {
        if (!navbar.contains(e.target)) {
            dropdowns.forEach(dropdown => dropdown.classList.remove('open'));
        }
    };
});


