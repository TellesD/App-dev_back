const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MaterialsSchema = new Schema({
    material: { type: String, required: true },
    created: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Materials', MaterialsSchema);