document.addEventListener('DOMContentLoaded', function () {
    // Retrieve form data from localStorage
    const formData = JSON.parse(localStorage.getItem('formData'));
    if (!formData) {
        // If no form data found, redirect to index page
        window.location.href = 'index.html';
        return;
    }
    // Display loan amount on the page which we got through index page
    const loanAmount = parseInt(formData.loanAmount);
    document.getElementById('loanAmount').textContent = loanAmount;

    const tenureSelect = document.getElementById('tenure');
    const tenures = loanAmount <= 50000 ? [3, 6] : loanAmount <= 100000 ? [9, 12, 18] : [30, 36, 48];
    tenures.forEach(months => {
        const option = document.createElement('option');
        option.value = months;
        option.textContent = `${months} months`;
        tenureSelect.appendChild(option);
    });
     // Event listener for tenure form submission
    document.getElementById('tenureForm').addEventListener('submit', function (event) {
        event.preventDefault();
        const selectedTenure = parseInt(tenureSelect.value);
        const emi = calculateEMI(loanAmount, 14, selectedTenure);
        document.getElementById('emi').textContent = `EMI: Rs. ${emi.toFixed(2)}`;
    });
});
//function to calculate EMI based on the amount
function calculateEMI(principal, annualInterestRate, tenureMonths) {
    const monthlyInterestRate = annualInterestRate / 12 / 100;
    return (principal * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, tenureMonths)) /
        (Math.pow(1 + monthlyInterestRate, tenureMonths) - 1);
}
// Below code is for getting name from index page and displayed logout button
document.addEventListener('DOMContentLoaded', function () {
    const formData = JSON.parse(localStorage.getItem('formData'));
    if (formData) {
        document.getElementById('username').textContent = formData.fullName.split(' ')[0];
    }
    document.getElementById('logout').addEventListener('click', function () {
        localStorage.clear();
        window.location.href = 'thankyou.html'; //Redirected to Thank you page
    });
});
