const mongoose = require('mongoose');


const transactionSchema = mongoose.Schema({
    amount: {
        type: Number,
        trim: true,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    note: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {timestamps: true})

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;