import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import FoodList from './components/FoodList';
import RegisterDonor from './components/RegisterDonor';
import RegisterReceiver from './components/RegisterReceiver';
import Login from './components/Login';
import Profile from './components/Profile';
import './index.css';

const App = () => {
    return (
        <Router>
            <header>
                <nav>
                    <Link to="/">Home</Link>
                    <Link to="/about">About</Link>
                    <Link to="/register-donor">Register as Donor</Link>
                    <Link to="/register-receiver">Register as Receiver</Link>
                    <Link to="/login">Login</Link>
                </nav>
            </header>
            <main>
                <Routes>
                    {/* Home page showing food list */}
                    <Route path="/" element={<FoodList />} />

                    {/* Register routes */}
                    <Route path="/register-donor" element={<RegisterDonor />} />
                    <Route path="/register-receiver" element={<RegisterReceiver />} />

                    {/* Login route */}
                    <Route path="/login" element={<Login />} />

                    {/* Profile page (protected route can be added later) */}
                    <Route path="/profile" element={<Profile />} />
                </Routes>
            </main>
        </Router>
    );
};

export default App;
