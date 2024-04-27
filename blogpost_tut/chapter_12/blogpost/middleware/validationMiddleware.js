//Middleware to make sure form fields are not null........
module.exports = (req, res, next) => {
    if (req.files == null || req.body.title == null) {
        // ......if so, redirect to create page.
        return res.redirect('/posts/new');
    }
    next();
}