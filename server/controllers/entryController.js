const entryController = require('express').Router();

const { hasUser } = require('../middlewares/guards');
const { create, getByUserId } = require('../services/entryService');
const { parseError } = require('../util/parser');


// * Works correct for creating entries:
entryController.post('/create', hasUser(), async (req, res) => {
    try {
        console.log('Received request:', req.body);

        const data = Object.assign({ _ownerId: req.user._id }, req.body);
        console.log('Data to be saved:', data);

        const entry = await create(data);
        console.log('Entry created:', entry);

        res.json(entry);
    } catch (err) {
        const message = parseError(err);
        res.status(400).json({ message });
    }
});


// * Get user`s entries:
entryController.get('/:userId', async (req, res) => {

    const { userId } = req.params;
    console.log('entryController`s userId =', userId);
    console.log('entryController`s req.body = ', req.body);

    try {

        const entries = await getByUserId(userId);
        console.log(entries);

        res.json(entries);
        return entries;

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }



})

module.exports = entryController;