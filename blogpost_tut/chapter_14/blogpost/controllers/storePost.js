const BlogPost = require('../models/BlogPost.js');
const path = require('path');

module.exports = (req, res) => {
    let image = req.files.image;
    // image.mv moves the uploaded file to public/img directory with the name from image.name
    image.mv(path.resolve(__dirname, "..", 'public/assets/img', image.name), async (error) => {
        //Use await to wait for blogpost to create before......
        await BlogPost.create({
            ...req.body,
            // Look for the file in img folder and place it the BD
            image: '/assets/img/' + image.name,
            // Populate it with the logged in user
            userid: req.session.userId
        });
        // .... redirecting
        res.redirect('/');
    });
}