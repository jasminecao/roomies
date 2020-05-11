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
  groceryList: {
    type: Object,
    require: false
  },
  choreList: {
    type: Object,
    require: false
  },
  messageList: {
    type: Object,
    require: false
  }
});

module.exports = Group = mongoose.model('GroupSchema', GroupSchema)