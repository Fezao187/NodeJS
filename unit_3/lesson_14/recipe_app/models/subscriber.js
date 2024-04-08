"use strict";

const mongoose = require("mongoose"),
  subscriberSchema = mongoose.Schema({
    name: String,
    email: String,
    zipCode: Number
  });
// Export the Subscriber model as the only module export.
module.exports = mongoose.model("Subscriber", subscriberSchema);
