const mongoose = require('mongoose');

const baseFields = {
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
};

const userSchema = new mongoose.Schema(baseFields, { timestamps: true });

const fields = Object.keys(userSchema.paths);

module.exports = {
  userFields: fields,
  User: mongoose.model('User', userSchema),
};
