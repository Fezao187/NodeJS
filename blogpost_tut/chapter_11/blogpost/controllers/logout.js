module.exports = (req, res) => {
    // Destroy all session data including user id data
    req.session.destroy(() => {
        res.redirect('/');
    });
}