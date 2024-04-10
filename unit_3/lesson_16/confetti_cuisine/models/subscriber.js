//Defining a subscriber schema

// Require mongoose
const mongoose = require("mongoose"),
    //Define schema properties
    subscriberSchema = mongoose.Schema({
        name: String,
        email: String,
        zipCode: Number
    });

// Creating an exported subscriber model in subscriber.js
//Export model
module.exports = mongoose.model("Subscriber", subscriberSchema);