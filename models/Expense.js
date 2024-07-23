const mongoose = require('mongoose');

const expsenseSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    amount : {
        type : Number,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    category :{
        type : String,
        enum : ['Groceries', 'Leisure', 'Electronics', 'Utilities', 'Clothing', 'Health', 'Others'],
        required : true
    },
    date : {
        type : Date,
        default : Date.now
    }
});

const Expense = mongoose.model.Expense || mongoose.model('expense', expsenseSchema);

module.exports = Expense;