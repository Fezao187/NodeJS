"use strict";

const express = require("express"),
  // Require mongoose.
  mongoose = require("mongoose"),
  app = express(),
  homeController = require("./controllers/homeController"),
  errorController = require("./controllers/errorController"),
  // Require the subscribers controller.
  subscribersController = require(
    "./controllers/subscribersController");
layouts = require("express-ejs-layouts");

//Setup the database connection
mongoose.connect(
  "mongodb://localhost:27017/confetti_cuisine",
  { userNewUrlParser: true }
);

app.set("view engine", "ejs");
app.set("port", process.env.PORT || 3000);
app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(express.json());
app.use(layouts);
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/courses", homeController.showCourses);
app.get("/contact", homeController.showSignUp);
app.post("/contact", homeController.postedSignUpForm);

// Add a route to view all subscribers.
app.get("/subscribers", subscribersController.getAllSubscribers);
//Add a route to view the contact page.
app.get("/contact", subscribersController.getSubscriptionPage);
//Add a route to handle posted form data.
app.post("/subscribe", subscribersController.saveSubscriber);

app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);

app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});
