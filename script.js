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

// Handle form submission for the quote form
document.getElementById('quoteForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    // Collect form data (matching field IDs from HTML)
    const formData = {
        fullName: document.getElementById('fullName').value.trim(),
        email: document.getElementById('email').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        location: document.getElementById('location').value.trim(),
        notes: document.getElementById('notes').value.trim()
    };

    // Validate fields (can be expanded as needed)
    if (!formData.fullName || !formData.email || !formData.phone || !formData.location || !formData.notes) {
        alert('Please fill out all required fields.');
        return;
    }

    try {
        // Send a POST request to your server
        const response = await fetch('/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        // Handle server response
        if (response.ok) {
            alert('Your quote request was sent successfully!');
            document.getElementById('quoteForm').reset(); // Reset form fields
        } else {
            const errorMessage = await response.text();
            alert(`There was an error: ${errorMessage}`);
        }
    } catch (error) {
        alert('An unexpected error occurred. Please try again later.');
        console.error('Error:', error);
    }
});
