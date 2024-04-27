const BlogPost = require('../models/BlogPost.js')
module.exports = async (req, res) => {
    //Call a specific ID to retrieve blog post with that ID
    const blogpost = await BlogPost.findById(req.params.id);
    console.log(blogpost)
    res.render('post', {
        // Pass the blogpost variable to post.ejs
        blogpost
    });
}