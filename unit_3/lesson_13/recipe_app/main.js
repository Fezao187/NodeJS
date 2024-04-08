"use strict";

const express = require("express"),
  app = express(),
  errorController = require("./controllers/errorController"),
  homeController = require("./controllers/homeController"),
  layouts = require("express-ejs-layouts"),
  // Require the MongoDB module.
  MongoDB = require("mongodb").MongoClient,
  dbURL = "mongodb://localhost:27017",
  dbName = "recipe_db";

  //Set up a connection to your local database server.
MongoDB.connect(
  dbURL,
  (error, client) => {
    if (error) throw error;
    //Get the recipe_db database from your connection to the MongoDB server.
    let db = client.db(dbName);
    db.collection("contacts")
      .find()
      //Find all records in the contacts collection.
      .toArray((error, data) => {
        if (error) throw error;
        //Print the results to the console.
        console.log(data);
      });

    db.collection("contacts").insert(
      {
        name: "Freddie Mercury",
        email: "fred@queen.com"
      },
      // Insert a new contact into the database
      (error, db) => {
        if (error) throw error;
        // Log the resulting errors or saved item.
        console.log(db);
      }
    );
  }
);

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
