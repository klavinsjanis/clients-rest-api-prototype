const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const clientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

clientSchema.plugin(mongooseDelete);

module.exports = mongoose.model('Client', clientSchema);
