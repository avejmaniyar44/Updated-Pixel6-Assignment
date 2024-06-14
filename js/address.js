document.addEventListener('DOMContentLoaded', function () {
        // Retrieve form data from localStorage
    const formData = JSON.parse(localStorage.getItem('formData'));
    if (!formData) {
        // If no form data found, redirect to index page
        window.location.href = 'index.html';
        return;
    }

    // Auto-populate Full Name field
    document.getElementById('fullName').value = formData.fullName;

    // Event listener for address form submission
    document.getElementById('addressForm').addEventListener('submit', function (event) {
        event.preventDefault();
        // Collect address data from form
        const addressData = {
            fullName: document.getElementById('fullName').value,
            address1: document.getElementById('address1').value,
            address2: document.getElementById('address2').value,
            city: document.getElementById('city').value,
            state: document.getElementById('state').value,
            zip: document.getElementById('zip').value,
            country: document.getElementById('country').value
        };
        localStorage.setItem('addressData', JSON.stringify(addressData));
        window.location.href = 'loan-tenure.html'; // Redirect to loan tenure page
    });
});
