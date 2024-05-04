const mongoose = require("mongoose"),
    Schema = mongoose.Schema;
let uniqueValidator = require('mongoose-unique-validator');
// Import the bcrypt package
const bcrypt = require("bcrypt"),
    UserSchema = new Schema({
        name: {
            type: String,
            required: [true, "Please enter your name"]
        },
        username: {
            type: String,
            required: [true, "Please provide username"],
            unique: [true, "Username already exists"]
        },
        email: {
            type: String,
            required: [true, "Please enter your email"],
            unique: [true, "Email already exits"]
        },
        password: {
            type: String,
            required: [true, "Please enter password"]
        }
    });

UserSchema.plugin(uniqueValidator);
// Hash the password
UserSchema.pre("save", function (next) {
    // Get the user being saved
    const user = this;
    bcrypt.hash(user.password, 10, (error, hash) => {
        // Replace the original password with the hashed one
        user.password = hash;
        next();
    });
});

// export user model
const User = mongoose.model("User", UserSchema);
module.exports = User;