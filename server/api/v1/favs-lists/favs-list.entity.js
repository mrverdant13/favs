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

const sortingFields = Object.keys(favsListSchema.paths);

module.exports = {
  favsListSortingFields: sortingFields,
  FavsList: mongoose.model('FavsList', favsListSchema),
};
