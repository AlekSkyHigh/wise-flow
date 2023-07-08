const entryController = require('express').Router();

const { hasUser } = require('../middlewares/guards');
const { create } = require('../services/entryService');
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

module.exports = entryController;