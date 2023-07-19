const { Schema, model, Types: { ObjectId } } = require('mongoose');

const entrySchema = new Schema({
    type: {
        type: String,
        enum: ['income', 'expense'],
        required: [true, 'Please select a type.']
    },
    occurrence: {
        type: String,
        enum: ['one-time', 'regular'],
        required: [true, 'Please select an occurance.']
    },
    amount: {
        type: Number,
        required: [true, 'Amount is required.'],
        min: [0, 'Please, write the expense as a positive number']
    },
    date: {
        type: Date,
        required: [true, 'Date is required.']
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        minlength: [4, 'The description must be atleast 4 characters long'],
        maxlength: [20, 'The description should be less than 20 characters long']
    },
    _ownerId: { type: ObjectId, ref: 'User', required: true }
});

const Entry = model('Entry', entrySchema);

module.exports = Entry;
