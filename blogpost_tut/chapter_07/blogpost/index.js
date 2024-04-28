/**We use (npm install nodemon --save-dev) to install
 * a package that detects changes and automatically 
 * restart the server for us.
 */
// Install express
const express = require('express'),
    path = require('path'),
    // Import ejs
    ejs = require('ejs'),
    // import mongoose
    mongoose = require('mongoose'),
    // Import out blogpost model
    BlogPost = require('./models/BlogPost.js'),
    /**adds the files property to the req object so that we can access the uploaded 
     * files using req.files. */
    fileUpload = require('express-fileupload'),
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

// Handle the post request
// app.post('/posts/store', (req, res) => {
//     // /**Get the form data from the broswer via 
//     //  * the request body attribute.
//     //  */
//     // console.log(req.body);
//     // res.redirect('/');
//     // model creates a new doc with browser data 
//     console.log(req.body);
//     BlogPost.create(req.body).then(blogpost => {
//         console.log("Successfully created\n" + blogpost);
//         res.redirect('/');
//     }).catch(error => {
//         console.log("Failed to create\n" + error);
//     });
// });

//Use async and await to avoid callback hell
//Async, specify that the method is asynchronous
app.post('/posts/store', (req, res) => {
    let image = req.files.image;
    // image.mv moves the uploaded file to public/img directory with the name from image.name
    image.mv(path.resolve(__dirname, 'public/assets/img', image.name), async (error) => {
        //Use await to wait for blogpost to create before......
        await BlogPost.create({
            ...req.body,
            // Look for the file in img folder and place it the BD
            image: '/assets/img/' + image.name
        });
        // .... redirecting
        res.redirect('/');
    });
});
//Routing for different html files
app.get('/', async (req, res) => {
    // res.sendFile(path.resolve(__dirname, 'pages/index.html'));
    // res.render(‘index’) will look in a 'views' folder for the file index.ejs.

    //find all the blogposts in our DB
    const blogposts = await BlogPost.find({});
    res.render('index', {
        blogposts
    });
    console.log(blogposts);
});
app.get('/about', (req, res) => {
    // res.sendFile(path.resolve(__dirname, 'pages/about.html'));
    res.render("about");
});
app.get('/contact', (req, res) => {
    // res.sendFile(path.resolve(__dirname, 'pages/contact.html'));
    res.render("contact");
});

// app.get('/post', (req, res) => {
//     // res.sendFile(path.resolve(__dirname, 'pages/post.html'));
//     res.render("post");
// });

//Append a parameter for the route for a single post by ID
app.get('/post/:id', async (req, res) => {
    //Call a specific ID to retrieve blog post with that ID
    const blogpost = await BlogPost.findById(req.params.id);
    console.log("Param", req.params.id);
    res.render('post', {
        // Pass the blogpost variable to post.ejs
        blogpost
    });
});
app.get('/posts/new', (req, res) => {
    res.render('create');
});

// Listen on port 4000
app.listen(4000, () => {
    console.log('App listening on port 4000');
});