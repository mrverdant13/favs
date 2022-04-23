const mongoose = require('mongoose');

const { FavsList } = require('../favs-lists/favs-list.entity');

const favItemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    list: {
      type: mongoose.Schema.Types.ObjectId,
      ref: FavsList.modelName,
      required: true,
    },
  },
  { timestamps: true },
);

const sortingFields = Object.keys(favItemSchema.paths);

module.exports = {
  favItemSortingFields: sortingFields,
  FavItem: mongoose.model('FavItem', favItemSchema),
};
