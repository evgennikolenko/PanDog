const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const paginate = require('mongoose-paginate');


const Schema = mongoose.Schema;

const productsSchema = new Schema({
    animalId: {
        type: String,
        required: true,
        unique: true
    },
    src: {
        type: String
    },
    type: {
        type: String
    },
    breed: {
        type: String
    },
    age: {
        type: Number,
        min: 0,
        max: 80
    },
    description: {
        type: String
    },
    cost: {
        type: Number,
        required: true
    },
    available: {
        type: Boolean,
        default: true
    },
    location: {
        type: String
    },
    photos: {
        type: String,
        unique: true
    },
    discount: {
        type: Number
    },
    reviews: {
        type: String,
        unique: true
    }
}, { versionKey: false });

productsSchema.plugin(timestamps);
productsSchema.plugin(paginate);

module.exports = mongoose.model('products', productsSchema);