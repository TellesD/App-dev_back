const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StyleSchema = new Schema({
    tag: { type: String, required: true },
    created: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Tags', StyleSchema);