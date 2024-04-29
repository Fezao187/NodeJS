// Case 1: Mongoose One-to-Many (Few) Relationship
const mongoose = require("mongoose");

const Tutorial = mongoose.model(
    "Tutorial",
    new mongoose.Schema({
        title: String,
        author: String,
        images: [],
        comments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Comment"
            }
        ],
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category"
        }
    })
);

module.exports = Tutorial;
