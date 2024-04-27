// STore the data key of flash
module.exports = (req, res) => {
    let username = "",
        password = "";
    const data = req.flash('data')[0];
    // CHeck if data is undifined
    if (typeof data != "undefined") {
        // Assign username and password
        username = data.username;
        password = data.password;
    }
    res.render('register', {
        // errors: req.session.validationErrors
        // retrieve the errors and present them in the view
        errors: req.flash('validationErrors'),
        username: username,
        password: password
    }); // render register.ejs 
}