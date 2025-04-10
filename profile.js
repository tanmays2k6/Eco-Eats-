document.addEventListener('DOMContentLoaded', () => {
    // Retrieve user data from localStorage
    const userData = JSON.parse(localStorage.getItem('userData'));
  
    if (!userData) {
      // Redirect to login page if no user data found
      window.location.href = 'login.html';
      return;
    }
  
    // Populate user details on the profile page
    document.getElementById('name').innerText = userData.name || 'N/A';
    document.getElementById('mobile').innerText = userData.mobile || 'N/A';
    document.getElementById('address').innerText = userData.address || 'N/A';
    document.getElementById('email').innerText = userData.email || 'N/A';
    document.getElementById('userType').innerText = userData.userType || 'N/A';
  });
  