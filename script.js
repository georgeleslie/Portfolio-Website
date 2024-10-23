document.addEventListener("DOMContentLoaded", function () {
    // Declare `menu` and `navbar`
    const menu = document.querySelector('#icon-hamburger');
    const navbar = document.querySelector('.navbar');
    const dropdowns = document.querySelectorAll('.dropdown');

    // Toggle hamburger menu for mobile
    menu.onclick = () => {
        menu.classList.toggle('bx-x');
        navbar.classList.toggle('open');
    };

    // Handle dropdowns for mobile (Click behavior)
    dropdowns.forEach(dropdown => {
        const dropdownToggle = dropdown.querySelector('a');

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
        // If clicking outside the navbar, close the menu and any open dropdowns
        if (!navbar.contains(e.target) && !menu.contains(e.target)) {
            navbar.classList.remove('open');
            menu.classList.remove('bx-x');
            dropdowns.forEach(dropdown => dropdown.classList.remove('open'));
        }
    };
});

// Handle form submission for a quote form
document.getElementById('quoteForm').addEventListener('submit', function (e) {
    e.preventDefault();
    alert('Form submitted!');
    // Here you can add code to send form data to your server
});
