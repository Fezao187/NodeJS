const mongoose = require('mongoose');
//We import the blogpost model
const BlogPost = require('./models/BlogPost');
//Connect to my_database
mongoose.connect('mongodb://localhost/my_database', {
    useNewUrlParser:
        true
});

//Create the data and save to database
// BlogPost.create({
//     title: 'The Mythbuster Guide to Saving Money on Energy Bills',
//     body: 'If you have been here a long time, you might remember when' +
//         ' I went on ITV Tonight to dispense a masterclass in saving money' +
//         ' on energy bills. Energy-saving is one of my favourite money topics,' +
//         ' because once you get past the boring bullet-point lists, a whole new ' +
//         'world of thrifty nerdery opens up. You know those bullet-point lists. ' +
//         'You start spotting them everything at this time of year. They go like this:',
//     name: "Kristine Wildheart"
// }).then(blogpost => {
//     console.log("Successfully created\n" + blogpost);
// }).catch(error => {
//     console.log("Failed to create\n" + error);
// });

//Reading data from MongoDB using Mongoose
//Selects all documents in Blogposts
// BlogPost.find({})
//     .then(blogpost => {
//         console.log("Successfully found\n" + blogpost);
//     }).catch(error => {
//         console.log("Failed to find\n" + error);
//     });

//Selects all with specific title
// BlogPost.find({
//     title: 'The Mythbuster Guide to Saving Money on Energy Bills',
// }).then(blogpost => {
//     console.log("Successfully found\n" + blogpost);
// }).catch(error => {
//     console.log("Failed to find\n" + error);
// });

//To find all with "The" in the title
// BlogPost.find({
//     title: /The/
// }).then(blogpost => {
//     console.log("Successfully found\n" + blogpost);
// }).catch(error => {
//     console.log("Failed to find\n" + error);
// });

//Use the findbyId method to get a specific ID
// let id = "6626e19e8479fde5428d687f";
// BlogPost.findById(id).then(blogpost => {
//     console.log("Successfully found\n" + blogpost);
// }).catch(error => {
//     console.log("Failed to find\n" + error);
// });

//Updating records
// let id = "6626e19e8479fde5428d687f";
// BlogPost.findByIdAndUpdate(id, {
//     title: 'Updated title'
// }).then(blogpost => {
//     console.log("Successfully found\n" + blogpost);
// }).catch(error => {
//     console.log("Failed to find\n" + error);
// });

//Deleting a single record
let id = "6626e19e8479fde5428d687f";
BlogPost.findByIdAndDelete(id).then(blogpost => {
    console.log("Successfully found and deleted\n" + blogpost);
}).catch(error => {
    console.log("Failed to find and delete\n" + error);
});