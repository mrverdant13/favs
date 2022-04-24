const mongoose = require('mongoose');
const { hash } = require('bcryptjs');

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

// eslint-disable-next-line func-names
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    this.password = await hash(this.password, 10);
  }
  next();
});

const fields = Object.keys(userSchema.paths);

module.exports = {
  userFields: fields,
  User: mongoose.model('User', userSchema),
};
