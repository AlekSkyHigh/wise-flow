const authController = require('express').Router();
const { body, validationResult } = require('express-validator');

const { register, login, logout, updateUserBalance, findUser } = require('../services/userService');
const { parseError } = require('../util/parser');

authController.post(
    '/register',
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({ min: 4 }).withMessage('Password must be at least 4 characters long'),
    body('firstName').notEmpty().withMessage('First name is required'),
    body('lastName').notEmpty().withMessage('Last name is required'),
    async (req, res) => {
        try {
            const { errors } = validationResult(req);
            if (errors.length > 0) {
                throw errors;
            }

            const { email, password, firstName, lastName } = req.body;
            const token = await register(email, password, firstName, lastName);
            res.json(token);
        } catch (error) {
            const message = parseError(error);
            res.status(400).json({ message });
        }
    });

authController.post('/login', async (req, res) => {
    try {
        const token = await login(req.body.email, req.body.password);
        res.json(token);
    } catch (error) {
        const message = parseError(error);
        res.status(401).json({ message });
    }
});

authController.get('/logout', async (req, res) => {
    const token = req.token;
    await logout(token);
    res.status(204).end();
});

// * Get user:
authController.get('/:userId', async (req, res) => {
    try {
      const userId = req.params.userId;
      const user = await findUser(userId);
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });


//* Get user`s balance:
authController.get('/:userId/balance', async (req, res) => {
    try {
      const { userId } = req.params;
  
      const user = await findUser(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Return the user's balance
      res.json(user.balance);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
  });
  

// TODO trying to add balance
authController.put('/:userId/balance', async (req, res) => {
    try {
      const { userId } = req.params;
      const { balanceChange, type } = req.body;
      console.log('req.body = ', req.body);
      const user = await updateUserBalance(userId, balanceChange, type);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.json(user.balance);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
  });
  
  
  
  

module.exports = authController;