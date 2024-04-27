const User = require('../models/User.js');
const path = require('path');
module.exports = (req, res) => {
    User.create(req.body)
        .then(user => {
            console.log("User successfully created", user);
            res.redirect('/auth/login');
        }).catch(error => {
            console.log("Failed to create a user", error);
            // Map through an array of keys and access key's error for each of them
            const validationErrors = Object.keys(error.errors).map(key => error.errors[key].message);
            // Specify for validation errors
            req.flash('validationErrors', validationErrors);
            // Keep data keyed in if there is an error
            req.flash('data', req.body);
            res.redirect('/auth/register');
        });
}