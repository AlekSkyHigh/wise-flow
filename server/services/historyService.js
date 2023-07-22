const CalcHistory = require('../models/CalculationHistory')

async function create(history) {
    return CalcHistory.create(history);
}

async function getByUserId(userId) {
    return CalcHistory.find({ _ownerId: userId }).limit(3).sort({createdAt: -1});
}



module.exports = {
    create,
    getByUserId
};