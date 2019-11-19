const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArchSchema = new Schema({
    arch: { type: String, required: true },
    created: { type: Date, default: Date.now }
 });

module.exports = mongoose.model('Arch', ArchSchema );