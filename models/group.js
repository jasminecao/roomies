const mongoose = require('mongoose')

const GroupSchema = mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  users: {
    type: Object,
    require: true
  },
  grocerylist: {
    type: Object,
    require: false
  }
});

module.exports = Group = mongoose.model('GroupSchema', GroupSchema)