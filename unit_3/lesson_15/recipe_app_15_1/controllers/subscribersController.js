"use strict";
// Require the subscriber module.
const Subscriber = require("../models/subscriber");

// Export getAllSubscribers to pass data from the database to the next middleware function.
exports.getAllSubscribers = (req, res, next) => {
  // Query with find on the Subscriber model
  Subscriber.find({}, (error, subscribers) => {
    // Pass an error to the next middleware function.
    if (error) next(error);
    //Set data that comes back from MongoDB on request object.
    req.data = subscribers;
    //Continue to the next middleware function.
    next();
  });
};
