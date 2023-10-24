document.addEventListener('DOMContentLoaded', () => {
    function validateCredentials() {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        if (username === 'user' && password === 'pass') {
            alert('You have successfully logged in.');
            window.location.href = 'http://127.0.0.1:5500/UA-1039-Samokhvalov/products-catalogue.html';
        } else {
            alert('Incorrect username or password. Please try again.');
        }
    }
    const submit = document.getElementById('submit-button');
    submit.addEventListener('click', validateCredentials);
});