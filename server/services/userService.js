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

  return jwt.sign(payload, secret);
}

function parseToken(token) {
  return jwt.verify(token, secret);
}

module.exports = {
  register,
  login,
  parseToken
};
