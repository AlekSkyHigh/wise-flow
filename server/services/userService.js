const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const secret = 'q-90234xcwmietvuselrg';

async function register(email, password, firstName, lastName) {
  const existing = await User.findOne({ email }).collation({ locale: 'en', strength: 2 });
  if (existing) {
    throw new Error('Email is taken');
  }

  const user = await User.create({
    email,
    firstName,
    lastName,
    hashedPassword: await bcrypt.hash(password, 10)
  });

  return createToken(user);
}

async function login(email, password) {
  const user = await User.findOne({ email }).collation({ locale: 'en', strength: 2 });
  if (!user) {
    throw new Error('Incorrect email or password');
  }

  const match = await bcrypt.compare(password, user.hashedPassword);
  if (!match) {
    throw new Error('Incorrect email or password');
  }

  return createToken(user);
}

function createToken(user) {
  const payload = {
    _id: user._id,
    email: user.email
  };

  const result = {
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    accessToken: jwt.sign(payload, secret)
  }

  return result;
}

function parseToken(token) {
  return jwt.verify(token, secret);
}

//* Find User
const findUser = async (userId) => {
  const user = await User.findById(userId)
  return user;
}

//* Adjusting user`s balance according the user`s request:
const updateUserBalance = async (userId, balanceChange, type, deleted) => {
  try {
    // console.log('Updating user balance:', userId, balanceChange, type);

    // console.log('balanceChange from userService.js = ', balanceChange);
    // console.log('type from userService.js = ', type);
    // console.log('deleted from userService.js = ', deleted);

    const user = await User.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    if(deleted){

      if (type === 'income') {
        user.balance -= balanceChange;
      } else if (type === 'expense') {
        user.balance += (-balanceChange);
      }

    } else {

      if (type === 'income') {
        user.balance += balanceChange;
      } else if (type === 'expense') {
        user.balance -= (-balanceChange);
      }

    }

    const updatedUser = await user.save();

    // console.log('Updated user:', updatedUser);

    return updatedUser.balance;
  } catch (err) {
    console.error(err);
    throw err;
  }
};




module.exports = {
  register,
  login,
  parseToken,
  updateUserBalance,
  findUser

};
