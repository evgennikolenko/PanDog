const mongoose = require('mongoose');
const lastModifier = require('./lastModifier');
const timestamps = require('mongoose-timestamp');
const paginate = require('mongoose-paginate');

const Schema = mongoose.Schema;

const subjectSchema  = new Schema({
    subjectName: {
        type: String,
        required: true
    },
    authorLogin: {
        type: String,
        required: true
    },
    authorId: {
        type: String,
        required: true
    }
},
    { versionKey: false }
);

subjectSchema.plugin(lastModifier);
subjectSchema.plugin(timestamps);
subjectSchema.plugin(paginate);

module.exports = mongoose.model('subjects', subjectSchema);