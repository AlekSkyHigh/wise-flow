const { Schema, model, Types: { ObjectId } } = require('mongoose');

const entrySchema = new Schema({
    type: {
        type: String,
        enum: ['income', 'expense'],
        required: true
    },
    occurrence: {
        type: String,
        enum: ['one-time', 'regular'],
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    _ownerId: { type: ObjectId, ref: 'User', required: true }
});

const Entry = model('Entry', entrySchema);

module.exports = Entry;
