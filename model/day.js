const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DaySchema = new Schema({
    picture: { type: String, required: false, unique:false },
    photographer: { type: String, required: false },
    description: { type: String, required: false },
    size: { type: String, required: false },
    arch: { type: String, required: false },
    year: { type: String, required: false },
    //providers=project name
    providers: { type: String, required: false },
    style: { type: Array, required: false },
    subjects: {type: Array, required: false},
    like: {type: String, required: false},
    created: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Card', DaySchema);
//picture, photographer, description, size, arch, age, providers, style