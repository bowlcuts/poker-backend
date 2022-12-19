const { model, Schema } = require('mongoose');

const userSchema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    chips: {
        type: Number,
        default: 1000,
    },
    // image: {
    //     type: String,
    //     default: './img/user.png'
    // }
})

const User = model("User", userSchema)

module.exports = User;