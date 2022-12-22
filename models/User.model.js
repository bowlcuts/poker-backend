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
})

const User = model("User", userSchema)

module.exports = User;