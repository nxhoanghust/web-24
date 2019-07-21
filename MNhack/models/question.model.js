const mongoose = require('mongoose');

const ParentSchema = new mongoose.Schema({
    name: [String],
    score: [[Number]],
});

const ParentModel = mongoose.model('Player', ParentSchema);

module.exports = ParentModel;