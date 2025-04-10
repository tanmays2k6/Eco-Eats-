const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs'); // Import bcrypt for password hashing
const path = require('path');

const app = express();
const port = 5013;

app.use(bodyParser.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies
app.use(express.static(path.join(__dirname, 'frontend'))); // Serve static files from frontend

// In-memory "database" to store users
let users = [];


// Registration Form Page
app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'register.html')); // Serve the registration form
});

// Registration handling
app.post('/register', async (req, res) => {
  const { name, mobile, address, email, password, userType } = req.body;

  // Validate required fields
  if (!name || !mobile || !address || !email || !password || !userType) {
    return res.status(400).send('All fields are required');
  }

  // Check if email already exists
  const existingUser = users.find(user => user.email === email);
  if (existingUser) {
    return res.status(409).send('User already registered with this email');
  }

  // Hash the password before storing it (use bcrypt for hashing)
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = {
    name,
    mobile,
    address,
    email,
    password: hashedPassword, // Store the hashed password
    userType,
  };

  users.push(user); // Store user in the "database"
  res.send(`<h2>Registration successful! You can <a href="/login">Login</a></h2>`);
});

// Login Form Page
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'login.html')); // Serve the login form
});

// Login handling
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send('Email and password are required');
  }

  // Check if the user exists
  const user = users.find(u => u.email === email);
  if (!user) {
    return res.status(401).send('Invalid credentials');
  }

  // Compare hashed password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).send('Invalid credentials');
  }

  // Successful login - serve profile page (no token needed)
  res.send(`
    <h2>Login successful!</h2>
    <p>Welcome, ${user.name} (${user.userType})</p>
    <p>Your email: ${user.email}</p>
    <p>Your address: ${user.address}</p>
    <p>Your mobile: ${user.mobile}</p>
    <p><a href="/profile">Go to Profile</a></p>
  `);
});


// Profile Page (Secured, but not using tokens, purely session-based for now)
app.get('/profile', (req, res) => {
  // In this case, we'll assume a simple session is being handled without JWT.
  // You can use session cookies or session management libraries like express-session for more security.

  // If using session (just for illustration; no actual session code implemented):
  const user = users[0]; // Assuming the first user is logged in (implement your session system in practice)

  if (!user) {
    return res.status(401).send('Unauthorized');
  }

  res.send(`
    <h2>Profile</h2>
    <p>Name: ${user.name}</p>
    <p>Email: ${user.email}</p>
    <p>Mobile: ${user.mobile}</p>
    <p>Address: ${user.address}</p>
    <p>User Type: ${user.userType}</p>
    <p><a href="/logout">Logout</a></p>
  `);
});

// Logout
app.get('/logout', (req, res) => {
  // This is a simple logout route (without session handling, you can add more sophisticated logout functionality)
  res.send(`<h2>You have been logged out. <a href="/login">Login</a></h2>`);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
