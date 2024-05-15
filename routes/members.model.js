const mongoose = require("mongoose")

mongoose.connect('mongodb://127.0.0.1:27017/LMS')

const customerSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String
    },
    phone: {
        type: String,
        required: true
    },
    issueDate: {
        type: Date
    },
    dueDate: {
        type: Date
    },
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book"
    }
})

const customerModel = mongoose.model("Member", customerSchema)

module.exports = customerModel