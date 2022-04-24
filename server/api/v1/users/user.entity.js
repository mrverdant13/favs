const mongoose = require('mongoose');

const hiddenFields = {
  password: {
    type: String,
    required: true,
  },
};

const baseFields = {
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  ...hiddenFields,
};

const userSchema = new mongoose.Schema(baseFields, { timestamps: true });

// eslint-disable-next-line func-names
userSchema.methods.toJSON = function () {
  const userJson = this.toObject();
  const hiddenFieldNames = Object.keys(hiddenFields);
  hiddenFieldNames.forEach((fieldName) => delete userJson[fieldName]);
  return userJson;
};

const fields = Object.keys(userSchema.paths);

module.exports = {
  userFields: fields,
  User: mongoose.model('User', userSchema),
};
