const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    name: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
    },
    status: {
        type: String,
        enum: ["active", "inactive", "blocked"],
        default: "active",
    }
});

const userModel = model("User", userSchema);
module.exports = userModel;