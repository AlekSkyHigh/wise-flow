const entryController = require('express').Router();

const { hasUser } = require('../middlewares/guards');
const { getAll, create, getById, update, deleteById, getByUserId } = require('../services/entryService');
const { parseError } = require('../util/parser');

// const Entry = require('../models/Entry');
// const User = require('../models/User');

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

// TODO tring to add balance:
// entryController.post('/create', hasUser(), async (req, res) => {
//     try {
//         // console.log('Received request:', req.body);

//         const data = Object.assign({ _ownerId: req.user._id }, req.body);
//         // console.log('Data to be saved:', data);

//         const entry = await create(data);
//         // console.log('Entry created:', entry);

//         // Find the user with the matching owner's ID
//         const user = await User.findById(_ownerId);
//         console.log('User:', user);

//         // Update the user's balance based on the entry type (income or expense)
//         if (entry.type === 'income') {
//             user.balance += entry.amount;
//         } else if (entry.type === 'expense') {
//             user.balance -= entry.amount;
//         }

//         // Save the updated user document
//         await user.save();

//         res.json(entry);
//     } catch (err) {
//         const message = parseError(err);
//         res.status(400).json({ message });
//     }
// });

// entryController.get('/', async (req, res) => {
//     let entries = [];
//     if (req.query.where) {
//         const userId = JSON.parse(req.query.where.split('=')[1]);
//         entries = await getByUserId(userId);
//     } else {
//         entries = await getAll();
//     }
//     res.json(entries);
// });

// entryController.get('/:userId', async (req, res) => {
//     try {
//       const userId = req.params.userId;
//       console.log(userId);

//       const entries = await getByUserId(userId);
//       console.log(entries);

//       res.json(entries);
//     } catch (err) {
//       const message = parseError(err);
//       res.status(400).json({ message });
//     }
//   });

// dataController.get('/:id', async (req, res, next) => {
//     const item = await getById(req.params.id);
//     res.json(item);
// });

// dataController.put('/:id', hasUser(), async (req, res, next) => {
//     const item = await getById(req.params.id);
//     if (req.user._id != item._ownerId) {
//         return res.status(403).json({ message: 'You cannot modify this record' });
//     }

//     try {
//         const result = await update(req.params.id, req.body);
//         res.json(result);
//     } catch (err) {
//         const message = parseError(err);
//         res.status(400).json({ message });
//     }
// });

// dataController.delete('/:id', hasUser(), async (req, res) => {
//     const item = await getById(req.params.id);
//     if (req.user._id != item._ownerId) {
//         return res.status(403).json({ message: 'You cannot modify this record' });
//     }

//     try {
//         await deleteById(req.params.id);
//         res.status(204).end();
//     } catch (err) {
//         const message = parseError(err);
//         res.status(400).json({ message });
//     }
// });

module.exports = entryController;