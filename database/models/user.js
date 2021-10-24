const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    id: String,
    displayName: String,
    provider: String,
    javaPoints: {
        type: Number,
        default: 0
    },
    cppPoints: {
        type: Number,
        default: 0
    },
    pythonPoints: {
        type: Number,
        default: 0
    },
    solved: [{
        type: String
    }]
});

module.exports = mongoose.model("users", UserSchema);