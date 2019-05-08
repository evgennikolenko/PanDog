const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');

const Schema = mongoose.Schema;

const animalsReviewsSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    reviews: {
        type: Object,

        message: {
          type: String,
        },
        name: {
            firstName: String,
            lastName: String
        },
    }
}, { versionKey: false });

animalsReviewsSchema.plugin(timestamps);

module.exports = mongoose.model('animalsReviews', animalsReviewsSchema);