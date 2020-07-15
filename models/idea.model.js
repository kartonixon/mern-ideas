const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ideaSchema = new Schema({
    content: { type: String, required: true },
    upvotes: { type: Number, required: true },
}, {
    timestamps: true,
});

const Idea = mongoose.model('Idea', ideaSchema);

module.exports = Idea;