const Entry = require('../models/Entry')

async function create(entry) {
    return Entry.create(entry);
}

async function getByUserId(userId) {
    return Entry.find({ _ownerId: userId });
}

async function getAll() {
    return Entry.find({});
}

async function getById(id) {
    return Entry.findById(id);
}

async function update(id, entry) {
    const existing = await Entry.findById(id);

    existing.type = entry.type;
    existing.occurrence = entry.occurrence;
    existing.amount = Number(entry.amount);
    existing.date = entry.date;
    existing.description = entry.description;

    return existing.save();
}

async function deleteById(id) {
    return Entry.findByIdAndDelete(id);
}


module.exports = {
    getAll,
    getByUserId,
    getById,
    create,
    update,
    deleteById
};