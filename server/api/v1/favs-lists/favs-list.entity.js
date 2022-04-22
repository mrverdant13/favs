const mongoose = require('mongoose');

const favsListSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const fields = Object.keys(favsListSchema.paths);

module.exports = {
  favsListFields: fields,
  FavsList: mongoose.model('FavsList', favsListSchema),
};
