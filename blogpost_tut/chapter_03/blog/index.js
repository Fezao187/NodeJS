/**We use (npm install nodemon --save-dev) to install
 * a package that detects changes and automatically 
 * restart the server for us.
 */
// Install express
const express = require('express'),
    path = require('path'),
    app = new express();

//Serve static files from public folder
app.use(express.static('public'));

//Routing for different html files
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'pages/index.html'));
});
app.get('/about', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'pages/about.html'));
});
app.get('/contact', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'pages/contact.html'));
});
app.get('/post', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'pages/post.html'));
});

// Listen on port 4000
app.listen(4000, () => {
    console.log('App listening on port 4000');
});