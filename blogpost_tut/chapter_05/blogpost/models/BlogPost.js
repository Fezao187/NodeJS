// Defining a model
const mongoose = require('mongoose'),
    //Define models using schema interface
    Schema = mongoose.Schema,
    BlogPostSchema = new Schema({
        title: String,
        body: String,
        name: String
    }),
    //Access the database via mongoose.model
    BlogPost = mongoose.model('BlogPost', BlogPostSchema);

/**Export the blogpost variable so that when other
 * file require, know to grab the blogpost.
 */
module.exports = BlogPost;