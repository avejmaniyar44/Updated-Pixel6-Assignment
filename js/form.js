document.getElementById('form').addEventListener('submit', function(event) {
    event.preventDefault();

    let isValid = true;

    // Full Name Validation logic
    const fullName = document.getElementById('fullName').value.trim();
    const fullNameRegex = /^[a-zA-Z]{4,}(?: [a-zA-Z]{4,})+$/;
    if (!fullNameRegex.test(fullName)) {
        isValid = false;
        document.getElementById('fullNameError').textContent = 'Full Name must be at least two words, each with a minimum of 4 characters.';
    } else {
        document.getElementById('fullNameError').textContent = '';
    }

    // Email Validation logic with Regular Expression
    const email = document.getElementById('email').value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        isValid = false;
        document.getElementById('emailError').textContent = 'Invalid email format.';
    } else {
        document.getElementById('emailError').textContent = '';
    }

    // PAN NUMBER Validation
    const pan = document.getElementById('pan').value.trim();
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
    if (!panRegex.test(pan)) {
        isValid = false;
        document.getElementById('panError').textContent = 'PAN must be in the format ABCDE1234F.';
    } else {
        document.getElementById('panError').textContent = '';
    }

    // Loan Amount Validation with word number converter function 
    const loanAmount = document.getElementById('loanAmount').value.trim();
    if (!/^\d+$/.test(loanAmount) || loanAmount < 10000 || loanAmount > 200000) {
        isValid = false;
        document.getElementById('loanAmountError').textContent = 'Loan Amount must be between 10,000 and 200,000.';
    } else {
        document.getElementById('loanAmountError').textContent = '';
        document.getElementById('amountInWords').textContent = 'Loan Amount in Words: ' + convertToWords(Number(loanAmount));
    }

    if (isValid) {
        const formData = { fullName, email, pan, loanAmount };
        localStorage.setItem('formData', JSON.stringify(formData));
        // window.location.href = 'confirm.html';
        setTimeout(() => {
            window.location.href = 'confirm.html';
        }, 2000);
    }
});

function convertToWords(num) {
    // Function to convert number to words
    const a = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
    const b = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
    const g = ['', 'thousand', 'million', 'billion', 'trillion'];

    if (num === 0) return 'zero';

    let str = '';
    let grp = 0;

    while (num > 0) {
        let rem = num % 1000;
        if (rem > 0) {
            let remStr = '';
            if (rem % 100 < 20) {
                remStr = a[rem % 100];
                rem = Math.floor(rem / 100);
            } else {
                remStr = a[rem % 10];
                rem = Math.floor(rem / 10);
                remStr = b[rem % 10] + ' ' + remStr;
                rem = Math.floor(rem / 10);
            }
            if (rem > 0) {
                remStr = a[rem] + ' hundred ' + remStr;
            }
            str = remStr + ' ' + g[grp] + ' ' + str;
        }
        num = Math.floor(num / 1000);
        grp++;
    }

    return str.trim();
}
