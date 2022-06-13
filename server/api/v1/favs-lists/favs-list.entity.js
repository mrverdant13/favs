const mongoose = require('mongoose');

const favsListSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true } },
);

const virtuals = {
  itemsCount: {
    ref: 'FavItem',
    localField: '_id',
    foreignField: 'list',
    count: true,
  },
};

Object.keys(virtuals).forEach((virtual) => {
  favsListSchema.virtual(virtual, virtuals[virtual]);
});

const mandatoryPopulation = Object.keys(virtuals).join(' ');

const sortingFields = Object.keys(favsListSchema.paths);

module.exports = {
  favsListSortingFields: sortingFields,
  favsListMandatoryPopulation: mandatoryPopulation,
  FavsList: mongoose.model('FavsList', favsListSchema),
};
