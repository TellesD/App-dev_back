const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CardSchema = new Schema({
    picture: { type: String, required: true, unique:false },
    photographer: { type: String, required: true },
    description: { type: String, required: true },
    size: { type: String, required: true },
    arch: { type: String, required: true },
    year: { type: String, required: true },
    providers: { type: String, required: true },
    style: { type: String, required: true },
    subjects: {type: String, required: true},
    created: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Card', CardSchema);
//picture, photographer, description, size, arch, age, providers, style