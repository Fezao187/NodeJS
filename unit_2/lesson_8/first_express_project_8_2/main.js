"use strict";

const port = 3000,
  express = require("express"),
  app = express();
app
  .get("/", (req, res) => {
    console.log("******Params", req.params);
    console.log("******body", req.body);
    console.log("******URL", req.url);
    console.log("******Query", req.query);
    res.send("Hello, Universe!");
  })
  .listen(port, () => {
    console.log(`The Express.js server has started and is listening on port number: ${port}`);
  });
