const mongoose = require('mongoose');

const ContactMessageSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String
});

module.exports = mongoose.model("Contact Messages", ContactMessageSchema);