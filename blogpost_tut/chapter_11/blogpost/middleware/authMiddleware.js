const User = require('../models/User');
module.exports = (req, res, next) => {
    // Fetch the user from the database
    User.findById(req.session.userId)
        .then(user => {
            // Check if the is successfully retrived
            if (!user)
                // If the user does not exist, direct back to the home page
                return res.redirect('/');
            // If the user is valid, permit the request to continue with next()
            next();
        }).catch(error => {
            if (error) {
                return res.redirect('/');
            }
        });
} 