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

//Routing for different html files
app.get('/', (req, res) => {
    // res.sendFile(path.resolve(__dirname, 'pages/index.html'));
    // res.render(‘index’) will look in a 'views' folder for the file index.ejs.
    res.render("index");
});
app.get('/about', (req, res) => {
    // res.sendFile(path.resolve(__dirname, 'pages/about.html'));
    res.render("about");
});
app.get('/contact', (req, res) => {
    // res.sendFile(path.resolve(__dirname, 'pages/contact.html'));
    res.render("contact");
});
app.get('/post', (req, res) => {
    // res.sendFile(path.resolve(__dirname, 'pages/post.html'));
    res.render("post");
});

// Listen on port 4000
app.listen(4000, () => {
    console.log('App listening on port 4000');
});