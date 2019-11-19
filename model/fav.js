const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArchSchema = new Schema({
    cardID: { type: String, required: true },
    userID: { type: String, required: true },
    created: { type: Date, default: Date.now }
 });

module.exports = mongoose.model('favorite', ArchSchema );