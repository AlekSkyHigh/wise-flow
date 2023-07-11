const entryController = require('express').Router();

const { hasUser } = require('../middlewares/guards');
const { create, getByUserId, deleteById } = require('../services/entryService');
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
    // console.log('entryController`s userId =', userId);
    // console.log('entryController`s req.body = ', req.body);

    try {

        const entries = await getByUserId(userId);
        console.log(entries);

        res.json(entries);
        return entries;

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// * Deleting entry:
entryController.delete('/:entryId', async (req, res) => {
    const { entryId } = req.params;
  
    try {
      const entryToDelete = await deleteById(entryId);
  
      if (!entryToDelete) {
        return res.status(404).json({ error: 'Entry not found' });
      }
  
      return res.status(200).json({ message: 'Entry deleted' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  });
  

module.exports = entryController;