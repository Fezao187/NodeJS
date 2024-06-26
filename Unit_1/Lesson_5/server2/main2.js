const port = 3000,
    http = require("http"),
    httpStatus = require("http-status-codes"),
    app = http.createServer();
app.on("request", (req, res) => {
    console.log("req.method", req.method);
    console.log("req.url", req.url);
    console.log("req.headers", req.headers);
    res.writeHead(httpStatus.OK, {
        "Content-Type": "text/html"
    });
    let responseMessage = "<h1>This will show on the screen.</h1>";
    res.end(responseMessage);
});
app.listen(port);
console.log(`The server has started and is listening on port number: 
➥${port}`);