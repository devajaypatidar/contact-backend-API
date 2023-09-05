const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required:[true,"please add the user Name"]
    },
    email: {
        type: String,
        required: [true,"please add the email"],
        unique: [true, "email Address already Taken"],
    },
    password: {
        type: String,
        required: [true,"please add the password"]
    }
},{timestamps: true});

module.exports = mongoose.model("user",userSchema);
