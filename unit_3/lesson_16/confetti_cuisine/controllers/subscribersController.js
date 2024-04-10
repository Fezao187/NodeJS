//Require the subscriber model.
const Subscriber = require("../models/subscriber");

//Retrieve all subscribers.
exports.getAllSubscribers = (req, res) => {
    Subscriber.find({})
        .exec()
        .then((subscribers) => {
            res.render("subscribers", {
                subscribers: subscribers
            });
        })
        .catch((error) => {
            console.log(error.message);
            return [];
        })
        .then(() => {
            console.log("promise complete");
        });
};
// Render the contact page.
exports.getSubscriptionPage = (req, res) => {
    res.render("contact");
};
//Save subscribers.
exports.saveSubscriber = (req, res) => {
    let newSubscriber = new Subscriber({
        name: req.body.name,
        email: req.body.email,
        zipCode: req.body.zipCode
    });
    newSubscriber.save()
        .then(() => {
            res.render("thanks");
        })
        .catch(error => {
            res.send(error);
        });
};