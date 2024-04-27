const User = require('../models/User.js');
const path = require('path');
module.exports = (req, res) => {
    User.create(req.body)
    .then(user =>{
        console.log("User successfully created", user);
        res.redirect('/');
    }).catch(error =>{
        console.log("Failed to create a user", error);
    });
}