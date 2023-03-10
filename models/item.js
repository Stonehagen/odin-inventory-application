const mongoose = require('mongoose');

const { Schema } = mongoose;

const ItemSchema = new Schema({
  name: { type: String, required: true, maxLength: 100 },
  description: { type: String, required: true, maxLength: 2500 },
  category: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
  price: {
    type: Number,
    required: true,
    min: [0, 'Price must be higher 0 or higher'],
    max: [1000000, 'Price must be 1000000 or lower'],
  },
  stock: {
    type: Number,
    required: true,
    min: [0, 'Stock must be higher 0 or higher'],
    max: [100000000, 'Stock must be 100000000 or lower'],
  },
});

ItemSchema.virtual('url').get(function getUrl() {
  // eslint-disable-next-line no-underscore-dangle
  return `./item/${this._id}`;
});

module.exports = mongoose.model('Item', ItemSchema);
