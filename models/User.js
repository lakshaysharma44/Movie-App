const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    gender: { type: String, required: true },
    ticketNumber: { type: Number, required: true },
    row: { type: Number }
});

module.exports = mongoose.model("User", userSchema);