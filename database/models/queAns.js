const mongoose = require('mongoose');

const queAnsSchema = new mongoose.Schema({
    lang: String,
    head: String,
    description: String,
    difficulty: Number,
    maxScore: Number,
    question: {
        type: String,
        default: null
    },
    stdin: String,
    stdout: String,

    inputFormat: String,
    constraints: String,
    outputFormat: String,

    sampleInput: String,
    sampleOutput: String,

    explanation: String,

    boilerplateCode: String,
    testCases: Array
});

module.exports = mongoose.model("Questions/Answers", queAnsSchema);