const mongoose = require("mongoose")

mongoose.connect('mongodb://127.0.0.1:27017/LMS')

const bookSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
    book: {
        type: String,
        default: "book"
    },
    issued: {
        type: String,
        default: "No"
    },

})

const booksModel = mongoose.model("Book", bookSchema)

module.exports = booksModel