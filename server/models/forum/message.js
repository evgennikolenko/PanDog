const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');

const Schema = mongoose.Schema;

const messageSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    authorLogin: {
        type: String,
        required: true
    },
    subjectName: {
        type: String,
        required: true
    },
    subjectId: {
        type: String,
        required: true
    }
}, { versionKey: false });

messageSchema.plugin(timestamps);

module.exports = mongoose.model('messages', messageSchema);