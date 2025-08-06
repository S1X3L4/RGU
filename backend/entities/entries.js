const mongoose = require('mongoose');



const entrySchema = new mongoose.Schema({
  salary: Number,
  days: Number,
  price: Number
});

const Entry = mongoose.model('Entry', entrySchema);

module.exports = Entry;