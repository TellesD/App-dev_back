const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
    email: { type: String, required: false, unique: true, lowercase: true },
    password: { type: String, required: false, select: false },
    name: { type: String, required: false },
    ocupation: { type: String, required: false},
    telephone: { type: String, required: false, unique: true  },
    like_id: { type: Array, required: false  },
    created: { type: Date, default: Date.now }
});

UserSchema.pre('save', async function (next) {
    let user = this;
    if (!user.isModified('password')) return next();

    user.password = await bcrypt.hash(user.password, 10);
    return next();
});

module.exports = mongoose.model('User', UserSchema);