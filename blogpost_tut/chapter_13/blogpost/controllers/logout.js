module.exports = (req, res) => {
    // Destro all session data including user id data
    req.session.destroy(() => {
        res.redirect('/');
    });
}