const Entry = require('../models/Entry')


async function getAll() {
    return Entry.find({});
}

async function getByUserId(userId) {
    return Entry.find({ _ownerId: userId });
}

async function getById(id) {
    return Entry.findById(id);
}

async function create(entry) {
    return Entry.create(entry);
}

async function update(id, entry) {
    const existing = await Entry.findById(id);

    existing.type = entry.type;
    existing.frequency = entry.frequency;
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