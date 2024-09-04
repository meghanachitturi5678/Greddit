const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const subgreddiitSchema = Schema({
  title: {
    type: String,
    unique: true,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  tags: {
    type: [String],
    required: true
  },
  userName: {
    type: String,
    required: true,
  },
  post: {
    type: [String],
    default: null
  },
  followers: {
    type: [String],
    default: null
  },
  blockedfollowers: {
    type: [String],
    default: null
  },
  bannedKeywords: {
    type: [String],
    required: true
  },
  requests: {
    type: [String],
    default: null
  },
  reportedPosts: {
    type: [{
      postId: String,
      reportedBy: String,
      concern: String,
      status: Boolean
    }]
  }
}, { timestamps: true })

module.exports = mongoose.model('Subgreddiit', subgreddiitSchema)