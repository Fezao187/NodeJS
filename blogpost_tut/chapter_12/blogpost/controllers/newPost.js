// module.exports = (req, res) => {
//     res.render('create');
// }

/**Check if the session contains a user id,
 * if it does, then show the create page.
 */
module.exports = (req, res) => {
    if (req.session.userId) {
        return res.render("create");
    }
    res.redirect('/auth/login');
} 