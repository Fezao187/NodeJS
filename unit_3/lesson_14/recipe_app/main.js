"use strict";

const express = require("express"),
  app = express(),
  errorController = require("./controllers/errorController"),
  homeController = require("./controllers/homeController"),
  layouts = require("express-ejs-layouts"),
  mongoose = require("mongoose"),
  Subscriber = require("./models/subscriber");

// Require mongoose.
mongoose.connect(
  // Set up the connection to your database
  "mongodb://localhost:27017/recipe_db",
  { useNewUrlParser: true }
);
mongoose.set("useCreateIndex", true);
//Assign the database to the db variable.
const db = mongoose.connection;

// Log a message when the application connects to the database.
db.once("open", () => {
  console.log("Successfully connected to MongoDB using Mongoose!");
});

//Instantiate a new subscriber
var subscriber1 = new Subscriber({
  name: "Jon Wexler",
  email: "jon@jonwexler.com"
});
//Save a subscriber to the database.
subscriber1.save((error, savedDocument) => {
  if (error) console.log(error);
  //Log saved data document.
  console.log(savedDocument);
});

Subscriber.create(
  {
    name: "Jon Wexler",
    email: "jon@jonwexler.com"
  },
  // Create and save a subscriber in a single step.
  function (error, savedDocument) {
    if (error) console.log(error);
    console.log(savedDocument);
  }
);
var myQuery = Subscriber.findOne({
  name: "Jon Wexler"
}).where("email", /wexler/);
//Run a query with a callback function to handle errors and data.
myQuery.exec((error, data) => {
  if (data) console.log(data.name);
});

app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(layouts);
app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(express.json());
app.use(homeController.logRequestPaths);

app.get("/name", homeController.respondWithName);
app.get("/items/:vegetable", homeController.sendReqParam);

app.post("/", (req, res) => {
  console.log(req.body);
  console.log(req.query);
  res.send("POST Successful!");
});

app.use(errorController.logErrors);
app.use(errorController.respondNoResourceFound);
app.use(errorController.respondInternalError);

app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});
