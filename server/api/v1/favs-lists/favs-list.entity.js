const mongoose = require('mongoose');

const favsListSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('FavsList', favsListSchema);
