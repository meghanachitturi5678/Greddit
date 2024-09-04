const Post = require("../models/postModel")
const Subgreddiit = require("../models/subgreddiitModel")

const getPostById = async (req, res) => {
  const { _id } = req.params
  try {
    const post = await Post.findById({ _id })
    const subgreddiit = await Subgreddiit.findOne({ title: post.subgreddiitTitle })
    if (!post) {
      return res.status(404).json({ error: "no post found" })
    }

    subgreddiit.bannedKeywords.forEach(value => {
      const regex = new RegExp('\\b' + value + '\\b', 'gi');
      post.content = post.content.replace(regex, '*'.repeat(value.length))
    })

    if (subgreddiit.blockedfollowers.some(value => value === post.userName)) {
      post.userName = "blockedUser"
    }
  
    res.status(200).json(post)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

const getPost = async (req, res) => {
  const { title } = req.params
  try {
    const subgreddiit = await Subgreddiit.findOne({ title: title })
    const posts = await Post.find({ subgreddiitTitle: title }).sort({ "createdAt": 1 })
    posts.forEach(post => {

      subgreddiit.bannedKeywords.forEach(value => {
        const regex = new RegExp('\\b' + value + '\\b', 'gi');
        post.content = post.content.replace(regex, '*'.repeat(value.length))
      })

      if (subgreddiit.blockedfollowers.some(value => value === post.userName)) {
        post.userName = "blockedUser"
      }
    
    })
    res.status(200).json(posts)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

const getUserPosts = async (req, res) => {
  const { userName } = req.user
  const { title } = req.params
  try {
    const posts = await Post.find({ subgreddiitTitle: title, userName: userName }, { _id: 1 }).sort({ "createdAt": 1 })
    res.status(200).json(posts)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

const createPost = async (req, res) => {
  const { content, userName, subgreddiitTitle } = req.body
  try {
    const post = await Post.create({ content, userName, subgreddiitTitle })
    res.status(200).json(post)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

const deletePost = async (req, res) => {
  const { _id } = req.params
  try {
    const post = await Post.findByIdAndDelete({ _id: _id })
    if (!post) {
      return res.status(404).json({ error: "no post found" })
    }
    res.status(200).json(post)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

const addComment = async (req, res) => {
  const { _id } = req.params
  const { comment } = req.body
  try {
    const post = await Post.findByIdAndUpdate({ _id: _id }, {
      $addToSet: {
        comments: comment
      }
    })
    if (!post) {
      return res.status(404).json({ error: "no post found" })
    }
    res.status(200).json(post)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

const addUpvote = async (req, res) => {
  const { _id } = req.params
  const userName = req.user.userName

  try {
    const post = await Post.findByIdAndUpdate({ _id: _id }, {
      $addToSet: {
        upvotes: userName
      },
      $pull: {
        downvotes: userName
      }
    }, { new: true })
    if (!post) {
      return res.status(404).json({ error: "no post found" })
    }
    res.status(200).json(post)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

const addDownvote = async (req, res) => {
  const { _id } = req.params
  const userName = req.user.userName

  try {
    const post = await Post.findByIdAndUpdate({ _id: _id }, {
      $addToSet: {
        downvotes: userName
      },
      $pull: {
        upvotes: userName
      }
    }, { new: true })
    if (!post) {
      return res.status(404).json({ error: "no post found" })
    }
    res.status(200).json(post)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

module.exports = {
  getPostById,
  createPost,
  deletePost,
  getPost,
  getUserPosts,
  addComment,
  addUpvote,
  addDownvote
}