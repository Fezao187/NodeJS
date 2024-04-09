"use strict";

const mongoose = require("mongoose"),
  { Schema } = mongoose,
  //Create the user schema.
  userSchema = new Schema(
    {
      // Add first and last name properties.
      name: {
        first: {
          type: String,
          trim: true
        },
        last: {
          type: String,
          trim: true
        }
      },
      email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
      },
      zipCode: {
        type: Number,
        min: [1000, "Zip code too short"],
        max: 99999
      },
      //Add a password property.
      password: {
        type: String,
        required: true
      },
      // Add a courses property to connect users to courses.
      courses: [{ type: Schema.Types.ObjectId, ref: "Course" }],
      subscribedAccount: {
        type: Schema.Types.ObjectId,
        // Add a subscribedAccount to connect users to subscribers.
        ref: "Subscriber"
      }
    },
    {
      // Add a timestamps property to record createdAt and updatedAt dates.
      timestamps: true
    }
  );

userSchema.virtual("fullName").get(function() {
  return `${this.name.first} ${this.name.last}`;
});
module.exports = mongoose.model("User", userSchema);
