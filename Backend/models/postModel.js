const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const postSchema = Schema({
  content: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  subgreddiitTitle: {
    type: String,
    required: true
  },
  upvotes: {
    type: [String]
  },
  downvotes: {
    type: [String]
  },
  comments: {
    type: [String]
  }
}, { timestamps: true })

module.exports = mongoose.model('Post', postSchema)