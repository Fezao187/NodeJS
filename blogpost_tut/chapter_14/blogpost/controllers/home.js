const BlogPost = require('../models/BlogPost.js');
module.exports = async (req, res) => {
    // res.render(‘index’) will look in a 'views' folder for the file index.ejs.
    //find all the blogposts in our DB
    // populate('userid') auto references the specified document with the userid
    const blogposts = await BlogPost.find({}).populate('userid'); 
    console.log(req.session);
    res.render('index', {
        blogposts
    });
} 