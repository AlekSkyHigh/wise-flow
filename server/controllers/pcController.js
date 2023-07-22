const pcController = require('express').Router();
const { create, getByUserId } = require('../services/historyService');

const { hasUser } = require('../middlewares/guards');


pcController.post('', hasUser(), async (req, res) => {

    console.log(req.body);
    try {

        const data = { _ownerId: req.body.userId, result: req.body.history }

        const historyToSave = await create(data)

        res.json(historyToSave);

    } catch (error) {
        console.log(error);
    }
});

pcController.get('/:userId', async (req, res) => {

    const { userId } = req.params;
    console.log('pcController`s userId =', userId);
    // console.log('entryController`s req.body = ', req.body);

    try {

        const results = await getByUserId(userId);
        console.log(results);

        res.json(results);
        return results;

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});


module.exports = pcController;
