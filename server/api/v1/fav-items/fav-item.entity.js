const mongoose = require('mongoose');
const { isUrl } = require('validator');

const { FavsList } = require('../favs-lists/favs-list.entity');

const baseFields = {
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
    validate: {
      validator: (v) => isUrl(v),
      message: (p) => `${p.value} is not a valid link.`,
    },
  },
};

const relations = {
  list: {
    type: mongoose.Schema.Types.ObjectId,
    ref: FavsList.modelName,
    required: true,
    paramSuffix: 'Id',
  },
};

const favItemSchema = new mongoose.Schema(
  {
    ...baseFields,
    ...relations,
  },
  { timestamps: true },
);

const sortingFields = Object.keys(favItemSchema.paths);

module.exports = {
  favItemSortingFields: sortingFields,
  favItemRelations: relations,
  FavItem: mongoose.model('FavItem', favItemSchema),
};
