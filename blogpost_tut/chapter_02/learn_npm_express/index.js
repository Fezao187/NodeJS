// Introduction to Express
// require express module 
const express = require('express'),
    //gets specific path of the file
    path = require('path'),
    // calls express function to start new Express app 
    app = express();

//Serving stattic files with express
//Ask express to serve files from public folder
app.use(express.static('public'));

//Handling requests with express
app.get('/', (req, res) => {
    // res.json({
    //     name: 'Greg Lim'
    // });
    //get full path of a file
    res.sendFile(path.resolve(__dirname, 'index.html'));
});
//Routing(map requests to specific handlers)
app.get('/about', (req, res) => {
    // res.json({
    //     name: 'Greg Lim'
    // });
    //Serving html files
    res.sendFile(path.resolve(__dirname, 'about.html'));
});

//called when request to /contact comes 
app.get('/contact', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'contact.html'));
});

//Listen on port 3000
app.listen(3000, () => {
    console.log("App listening on port 3000");
});