document.addEventListener('DOMContentLoaded', function() {
    //Retrive form data from Localstorage
    const formData = JSON.parse(localStorage.getItem('formData'));
    if (!formData) {
        //if form data  is not found it will redirect to index page
        window.location.href = 'index.html';
        return;
    }
    //Generates a random OTP 
    const firstName = formData.fullName.split(' ')[0];
    const email = formData.email;
    const otp = Math.floor(1000 + Math.random() * 9000);
    console.log('Generated OTP:', otp);
    document.getElementById('message').innerHTML = `
        Dear ${firstName},
        <br>
        Thank you for your inquiry. A 4-digit verification number has been sent to your email: ${email}.
        Please enter it in the following box and submit for confirmation:
    `;
    let attempts = 0;
    const maxAttempts = 3;
    //Evenet Listener for OTP Validation
    document.getElementById('validateForm').addEventListener('submit', function(event) {
        
        event.preventDefault();
        const enteredOtp = document.getElementById('otp').value.trim();
        if (enteredOtp === otp.toString()) {
            localStorage.setItem('validated', true);
            window.location.href = 'address.html'; //Redirect to address page
        } else {
            attempts++;
            if (attempts >= maxAttempts) {
                document.getElementById('validateForm').innerHTML = '<p>Validation Failed!</p>';
                setTimeout(() => {
                    window.location.href = '404.html'; // redirect to 404 not found page
                }, 2000);
            } else {
                document.getElementById('otpError').textContent = 'Invalid OTP. Please try again.';
                document.getElementById('otp').value = '';
            }
        }
    });
});
