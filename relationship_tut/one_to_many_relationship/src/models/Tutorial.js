// Case 1: Mongoose One-to-Many (Few) Relationship
const mongoose = require("mongoose");

// Create a tutorial model
const Tutorial = mongoose.model(
    "Tutorial",
    new mongoose.Schema({
        title: String,
        author: String,
        images: []
    })
);

module.exports = Tutorial;