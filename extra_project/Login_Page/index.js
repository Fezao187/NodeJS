// Install express
const express = require("express"),
    mongoose = require("mongoose"),
    flash = require('connect-flash'),
    expressSession = require('express-session'),
    User = require('./models/User.js'),
    bcrypt = require('bcrypt'),
    app = new express();

// Connect to mongoose
mongoose.connect("mongodb://localhost/login_database", {
    useNewUrlParser: true
});

// Tell express to use ejs as templating engine
app.set("view engine", "ejs");
// Server static files from the public folder
app.use(express.static('public'));
// Body parsing middleware to make form data available with req.body
app.use(express.json());
app.use(express.urlencoded());
app.use(expressSession({
    secret: 'keyboard cat'
}));

// Routes
app.post("/users/register", (req, res) => {
    // Save the user to the database
    User.create({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    }).then(user => {
        console.log("User created >>>>>>>: ", user);
        res.redirect("/");
    }).catch(error => {
        console.log("Failed to create user >>>>>>>: ", error);
    });
});

app.post("/users/login", (req, res) => {
    const { username, password } = req.body;
    // Use findone to find username
    User.findOne({ username: username })
        .then(user => {
            if (user) {
                bcrypt.compare(password, user.password, (error, same) => {
                    if (same) {
                        // If passwords match
                        // Save id data on the user's browser
                        req.session.userId = user._id;
                        res.redirect('/new/acc');
                    } else {
                        res.redirect('/');
                    }
                });
            }
            else {
                res.redirect('/');
            }
        }).catch(error => {
            console.log(error);
        });
});

app.post("/users/reset", (req, res) => {
    const { username, email, password } = req.body;
    // Find the username and password to verify the user
    User.find({
        username: username,
        email: email
    }).then(user => {
        if (user) {
            User.update({
                password: password
            });
            res.redirect('/');
        } else {
            console.log("Weird error");
            res.redirect('/reset/acc');
        }
    }).catch(error => {
        console.log("Error >>>>>>>", error);
        res.redirect('/reset/acc');
    });
});

// Login page
app.get("/", (req, res) => {
    res.render("index", {
        login: true
    });
});
// New acc
app.get("/new/acc", (req, res) => {
    res.render("create", {
        create: true
    });
});
// Reset pass
app.get("/reset/acc", (req, res) => {
    res.render("reset", {
        reset: true
    });
});

// Listen on port 4000
app.listen(4000, () => {
    console.log("App listening on http://localhost:4000");
});