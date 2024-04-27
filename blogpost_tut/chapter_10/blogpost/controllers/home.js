const BlogPost = require('../models/BlogPost.js');
module.exports = async (req, res) => {
    // res.render(‘index’) will look in a 'views' folder for the file index.ejs.
    //find all the blogposts in our DB
    const blogposts = await BlogPost.find({});
    res.render('index', {
        blogposts
    });
} 