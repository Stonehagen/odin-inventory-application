const mongoose = require('mongoose');

const { Schema } = mongoose;

const CategorySchema = new Schema({
  name: { type: String, required: true, maxLength: 100 },
  description: { type: String, require: true, maxLength: 1000 },
});

CategorySchema.virtual('url').get(function getUrl() {
  // eslint-disable-next-line no-underscore-dangle
  return `./category/${this._id}`;
});

module.exports = mongoose.model('Category', CategorySchema);
