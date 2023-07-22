const { Schema, model, Types: { ObjectId } } = require('mongoose');

const calcHistorySchema = new Schema({
    _ownerId: { type: ObjectId, ref: 'User', required: true },
    result: {
        type: String,
        // required: true
    }
    
}, {timestamps: true});

const CalcHistory = model('calcHistory', calcHistorySchema);

module.exports = CalcHistory;