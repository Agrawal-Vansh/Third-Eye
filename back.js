const express = require('express');
const session = require('express-session');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'your-secret-key', resave: false, saveUninitialized: false }));

mongoose.connect('mongodb://localhost:27017/myapp', { useNewUrlParser: true, useUnifiedTopology: true });

const User = mongoose.model('User', { username: String, password: String });

// Registration
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.redirect('/login');
});

// Login
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user) {
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (passwordMatch) {
            req.session.userId = user._id;
            return res.redirect('/dashboard');
        }
    }
    res.redirect('/login');
});

// Authentication middleware
const requireLogin = (req, res, next) => {
    if (req.session && req.session.userId) {
        return next();
    }
    res.redirect('/login');
};

// Dashboard route (requires authentication)
app.get('/dashboard', requireLogin, (req, res) => {
    res.send('Welcome to the dashboard!');
});

// Login page
app.get('/login', (req, res) => {
    res.send(`
        <h1>Login</h1>
        <form method="post" action="/login">
            <input type="text" name="username" placeholder="Username" required><br>
            <input type="password" name="password" placeholder="Password" required><br>
            <button type="submit">Login</button>
        </form>
    `);
});

// Registration page
app.get('/register', (req, res) => {
    res.send(`
        <h1>Register</h1>
        <form method="post" action="/register">
            <input type="text" name="username" placeholder="Username" required><br>
            <input type="password" name="password" placeholder="Password" required><br>
            <button type="submit">Register</button>
        </form>
    `);
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
