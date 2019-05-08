const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    moderatorId: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'in progress'
    },
    itemsTotal: {
        type: Number,
        required: true
    },
    deliveryTotal: {
        type: Number,
        default: 0
    },
    grossTotal: {
        type: Number,
        required: true
    },
    items: [{
        quantity: Number,
        productId : {
            type: String,
            required: true
        }
    }]
}, { versionKey: false });

orderSchema.plugin(timestamps);

module.exports = mongoose.model('orders', orderSchema);