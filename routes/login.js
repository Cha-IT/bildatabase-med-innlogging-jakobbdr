const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcrypt');
const path = require('path');

// Render login page
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/login.html'));
});

// Handle login form submission
router.post('/', (req, res) => {
    const { username, password } = req.body;
    const user = db.prepare('SELECT * FROM users WHERE username = ?').get(username);
    if (user) {
        bcrypt.compare(password, user.password_hash, (err, result) => {
            if (result) {
                // Passwords match
                req.session.userId = user.id;
                res.redirect('/'); // Redirect to home page after successful login
            } else {
                // Passwords don't match
                res.status(401).send('Invalid username or password');
            }
        });
    } else {
        res.status(401).send('Invalid username or password');
    }   
});


module.exports = router;
