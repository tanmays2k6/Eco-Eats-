// Handle form submission for receiver registration
document.getElementById('receiver-registration-form').addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent the form from submitting the default way
  
    // Get values from the form fields
    const name = document.getElementById('name').value;
    const mobile = document.getElementById('mobile').value;
    const address = document.getElementById('address').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    // Create the receiver data object
    const receiverData = {
        userType: 'Receiver',
        name,
        mobile,
        address,
        email,
        password,
    };
  
    // Validate form fields
    if (!name || !mobile || !address || !email || !password) {
        alert('Please fill in all fields.');
        return;
    }

    // Retrieve users from localStorage (if any)
    const existingUsers = localStorage.getItem('users');
    const users = existingUsers ? JSON.parse(existingUsers) : [];

    // Check if the email is already taken
    const userExists = users.some(user => user.email === email);
    if (userExists) {
        alert('User with this email already exists. Please try a different email.');
        return;
    }

    // Add the new receiver to the list of users
    users.push(receiverData);
  
    // Save updated users list to localStorage
    localStorage.setItem('users', JSON.stringify(users));
  
    // Registration successful
    alert('Registration successful!');
  
    // Redirect to receiver login page after successful registration
    window.location.href = 'receiver_login.html'; // Adjust as needed
});
