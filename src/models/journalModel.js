const mongoose = require('mongoose');

const journalSchema = new mongoose.Schema({}, {strict:false});

const journal = mongoose.model('journal', journalSchema);

module.exports = journal;