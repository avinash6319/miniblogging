const mongoose = require('mongoose')

const authorSchema = new mongoose.Schema({
    fname: {
        type: String,
        require: true
    },
    lname: {
        type: String,
        require: true
    },
    title: {
        type: String,
        required: true,
        enum: ["Mr", "Mrs", "Miss"]
    },
    email: { 
        type: String,
        required: true,
        match: /.+\@.+\..+/,
        unique: true
    },
    password: { type: String , required: true }
}, { timestamps: true });

module.exports = mongoose.model('author', authorSchema)

