document.getElementById('registrationForm').addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent the form from submitting the default way

    // Get input values
    const name = document.getElementById('name').value;
    const mobile = document.getElementById('mobile').value;
    const address = document.getElementById('address').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Validate inputs
    if (!name || !mobile || !address || !email || !password) {
        alert("Please fill in all fields!");
        return;
    }

    // Create a user object
    const userDetails = {
        name,
        mobile,
        address,
        email,
        password
    };

    // Check if the user is already registered (using email as unique identifier)
    const existingUser = localStorage.getItem('users');
    const users = existingUser ? JSON.parse(existingUser) : [];

    const userExists = users.some(user => user.email === email);
    if (userExists) {
        alert("User with this email already exists. Please try a different email.");
        return;
    }

    // Save user details in localStorage
    users.push(userDetails);
    localStorage.setItem('users', JSON.stringify(users));

    // Registration successful, redirect to login page
    alert('Registration successful!');
    window.location.href = 'login.html'; // Redirect to login page after successful registration
});


document.getElementById('registration-form').addEventListener('submit', (event) => {
    event.preventDefault();
  
    const name = document.getElementById('name').value;
    const mobile = document.getElementById('mobile').value;
    const address = document.getElementById('address').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    const userData = {
      name,
      mobile,
      address,
      email,
      userType: 'Donor' // or 'Receiver' based on the registration form
    };
  
    // Simulate saving data to "database" and store it in localStorage
    localStorage.setItem('userData', JSON.stringify(userData));
  
    alert('Registration successful!');
    window.location.href = 'profile.html'; // Redirect to the profile page
  });
  