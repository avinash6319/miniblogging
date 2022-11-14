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
        require: true,
        enum: ["Mr", "Mrs", "Miss"]
    },
    email: {
        require: true,
        match: /.+\@.+\..+/,
        unique: true
    },
    password: { mandatory }
}, { timestamps: true });

module.exports.Schema = mongoose.Model('author', authorSchema)

