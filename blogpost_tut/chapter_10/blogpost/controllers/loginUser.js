/**We import the bcrypt package and User model. Next, 
     * we extract the username and password from the user login form 
     * with req.body.
     */
const bcrypt = require('bcrypt')
const User = require('../models/User')
module.exports = (req, res) => {
    const { username, password } = req.body;
    /**We then use User.findOne to try to find just one user with the 
     * inputted username........ */
    User.findOne({ username: username })
        .then(user => {
            if (user) {
                //  ......If such a user exists, we proceed on to compare passwords
                bcrypt.compare(password, user.password, (error, same) => {
                    if (same) { // if passwords match 
                        // store user session, will talk about it later 
                        res.redirect('/')
                    } else {
                        // If the user doesn’t exist, we direct back to the login page.
                        res.redirect('/auth/login');
                    }
                });
            }
            else {
                res.redirect('/auth/login');
            }
        }).catch(error => {
            console.log(error);
        });
}