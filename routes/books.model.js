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
    description: {
        type: String,
        required: true,
    },
    rating: {
        type: Number
    },
    reviews: {
        type: Number
    },
    coverImage: {
        type: String,
    }
})

const booksModel = mongoose.model("books", bookSchema)

module.exports = booksModel