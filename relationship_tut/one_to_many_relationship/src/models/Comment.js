// Case 2: Mongoose One-to-Many (Many) Relationship
const mongoose = require("mongoose");

const Comment = mongoose.model(
    "Comment",
    new mongoose.Schema({
        username: String,
        text: String,
        createdAt: Date
    })
);

module.exports = Comment;