/**We use (npm install nodemon --save-dev) to install
 * a package that detects changes and automatically 
 * restart the server for us.
 */
// Install express
const express = require('express'),
    // Import ejs
    ejs = require('ejs'),
    // import mongoose
    mongoose = require('mongoose'),
    /**adds the files property to the req object so that we can access the uploaded 
     * files using req.files. */
    fileUpload = require('express-fileupload'),
    newPostController = require('./controllers/newPost'),
    homeController = require('./controllers/home'),
    storePostController = require('./controllers/storePost'),
    getPostController = require('./controllers/getPost'),
    validateMiddleware = require("./middleware/validationMiddleware"),
    app = new express();

//Connecting to mongoose
mongoose.connect('mongodb://localhost/my_database', {
    useNewUrlParser:
        true
});
/**Tell express to use ejs  as a templating engine,
 * that any file ending in .ejs should be rendered
 * with the ejs package.
 */

app.set('view engine', 'ejs');
//Serve static files from public folder
app.use(express.static('public'));
/**Body Parsing middleware to make the form data available
 * under the req.body.
 */
app.use(express.json());
app.use(express.urlencoded());
// We register the package in Expres
app.use(fileUpload());
// Apply middleware to specific request
app.use('/posts/store', validateMiddleware);

// Handle the post request
app.post('/posts/store', storePostController);
// Handle homepage
app.get('/', homeController);
// For specific blog
app.get('/post/:id', getPostController);
// Create new blogpost
app.get('/posts/new', newPostController);

// Listen on port 4000
app.listen(4000, () => {
    console.log('App listening on http://localhost:4000');
});