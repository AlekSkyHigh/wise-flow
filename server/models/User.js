const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    hashedPassword: { type: String, required: true },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    balance: {
        type: Number,
        default: 0
    }
});

userSchema.index({ email: 1}, {
    collation: {
        locale: 'en',
        strength: 2,
    }
});

const User = model('User', userSchema);

module.exports = User;