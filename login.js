document.getElementById('login-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
            // Save user details for the session (if needed)
            sessionStorage.setItem('loggedInUser', JSON.stringify(user));
            alert('Login successful!');
            window.location.href = 'profile.html'; // Redirect to profile
        } else {
            alert('Invalid credentials. Please try again.');
        }
    } catch (error) {
        console.error('Error during login:', error);
        alert('An error occurred. Please try again.');
    }
});

  