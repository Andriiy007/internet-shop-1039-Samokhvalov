document.addEventListener('DOMContentLoaded', () => {
    function validateCredentials() {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        if (username === 'user' && password === 'pass') {
            alert('You have successfully logged in.');
            window.location.href = 'add-form.html';
        } else {
            alert('Incorrect username or password. Please try again.');
        }
    }
    const submit = document.getElementById('submit-button');
    submit.addEventListener('click', validateCredentials);
});