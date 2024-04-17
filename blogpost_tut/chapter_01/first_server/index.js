//Creating our first server
//Require the http package
const http = require("http");
/**Create a server with the createServer method
 * from the http package
 */
//     server = http.createServer((req, res) => {
//         console.log(req.url);
//         //Check the request url using a switch statement 
//         switch (req.url) {
//             case "/":
//                 res.end("The home page");
//                 break;
//             case "/about":
//                 res.end("The about page");
//                 break;
//             case "/contact":
//                 res.end("The contact page");
//                 break;
//             case "/hello":
//                 res.end("Hello Node.js");
//                 break;
//             default:
//                 res.writeHead(404);
//                 res.end("page not found");
//         }
//     });

// //listen on port 3000
// server.listen(3000);

//Responding with html
//fs to interact with the files in our server
const fs = require('fs'),
//use readFileSync to read the content of each file
    homePage = fs.readFileSync('index.html'),
    aboutPage = fs.readFileSync('about.html'),
    contactPage = fs.readFileSync('contact.html'),
    notFoundPage = fs.readFileSync('notfound.html'),
    server = http.createServer((req, res) => {
        console.log(req.url);
        //Check the request url using a switch statement 
        switch (req.url) {
            case "/":
                res.end(homePage);
                break;
            case "/about":
                res.end(aboutPage);
                break;
            case "/contact":
                res.end(contactPage);
                break;
            default:
                res.writeHead(404);
                res.end(notFoundPage);
        }
    });

//listen on port 3000
server.listen(3000);