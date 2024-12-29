document.getElementById('login-form').addEventListener('submit', async (event) => {
    event.preventDefault();  // Prevent the form from submitting the default way

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Hardcoded credentials
    const validEmail = "user@example.com"; // Change to your valid email
    const validPassword = "password123";  // Change to your valid password

    // Simple validation
    if (email === validEmail && password === validPassword) {
        alert('Login successful!');
        // Redirect to the profile or dashboard page
        window.location.href = '/profile.html';  // Make sure this page exists
    } else {
        window.location.href = '/profile.html';
    }
});
document.getElementById('login-form').addEventListener('submit', (event) => {
    event.preventDefault();
  
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    // Simulated user authentication
    const storedUser = JSON.parse(localStorage.getItem('userData'));
    if (storedUser && storedUser.email === email) {
      if (password === 'your-password-check') { // Add password verification logic here
        alert('Login successful!');
  
        // Save the user data back to localStorage (if needed)
        localStorage.setItem('userData', JSON.stringify(storedUser));
  
        // Redirect to the profile page
        window.location.href = 'profile.html';
      } else {
        alert('Invalid credentials. Please try again.');
      }
    } else {
      alert('User not found. Please register first.');
    }
  });
  