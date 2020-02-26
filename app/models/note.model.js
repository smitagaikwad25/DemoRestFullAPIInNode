const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema({
    title: String,
    authorName: String
}, {
    timestamps: true
});

module.exports = mongoose.model('collection', NoteSchema);
