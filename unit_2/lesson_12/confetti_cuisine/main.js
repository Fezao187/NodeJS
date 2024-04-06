"use strict";

// Require express.
const express = require("express"),
  // Instantiate the express application.
  app = express(),
  homeController = require("./controllers/homeController"),
  errorController = require("./controllers/errorController"),
  //  Require the expressejs-layouts module
  layouts = require("express-ejs-layouts");

  // Set the application to use ejs.
app.set("view engine", "ejs");
app.set("port", process.env.PORT || 3000);
//Tell the Express.js app to use body-parser for processing URLencoded and JSON parameters.
app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(express.json());
// Set the application to use the layout module.
app.use(layouts);
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index");
});

//Add routes for the courses page, contact page, and contact form submission.
app.get("/courses", homeController.showCourses);
app.get("/contact", homeController.showSignUp);
app.post("/contact", homeController.postedSignUpForm);

//Add error handlers as middleware functions.
app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);

//Set the application up to listen on port 3000
app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});
