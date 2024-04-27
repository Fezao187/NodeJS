const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    //  import the bcrypt package in User.js 
    bcrypt = require('bcrypt'),
    UserSchema = new Schema({
        // Check if username is required and unique
        username: {
            type: String,
            required: true,
            unique: true
        },
        // Set the password to required
        password: {
            type: String,
            required: true
        }
    });
/**Use presave hook to tell momgoose to hash our password 
 * before we save to the database.
 */
UserSchema.pre('save', function (next) {
    // Get the user being saved
    const user = this;
    bcrypt.hash(user.password, 10, (error, hash) => {
        // Replace the original password with the hashed one
        user.password = hash;
        next();
    });
});

// export model 
const User = mongoose.model('User', UserSchema);
module.exports = User;