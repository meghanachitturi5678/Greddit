const Subgreddiit = require("../models/subgreddiitModel")
const Post = require("../models/postModel")
const User = require("../models/userModel")

const createSubgreddiit = async (req, res) => {
  const { title, content, tags, bannedKeywords, followers } = req.body
  try {
    const userName = req.user.userName
    console.log(userName)
    const subgreddiit = await Subgreddiit.create({ title, content, tags, userName, bannedKeywords, followers })
    res.status(200).json(subgreddiit)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

const getSubgreddiits = async (req, res) => {
  try {
    const userName = req.user.userName
    const subgreddiit = await Subgreddiit.find({ userName }).sort({ "createdAt": -1 })
    res.status(200).json(subgreddiit)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

const getSubgreddiit = async (req, res) => {
  const { title } = req.params
  try {
    const userName = req.user.userName
    const subgreddiit = await Subgreddiit.findOne({ title: title, userName })
    if (!subgreddiit) {
      return res.status(404).json({ error: "no subgreddiit found" })
    }
    res.status(200).json(subgreddiit)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

const deleteSubgreddiit = async (req, res) => {
  const { title } = req.params
  try {
    const userName = req.user.userName
    const subgreddiit = await Subgreddiit.findOneAndDelete({ title: title, userName })
    if (!subgreddiit) {
      return res.status(404).json({ error: "no subgreddiit found" })
    }
    await Post.deleteMany({ subgreddiitTitle: title })
    res.status(200).json(subgreddiit)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

const acceptSubgreddiit = async (req, res) => {
  const { title } = req.params
  try {
    const subgreddiit = await Subgreddiit.findOne({ title: title })
    console.log(req.body)
    subgreddiit.requests = subgreddiit.requests.filter(element => {
      element !== (req.body.userName)
    });
    await subgreddiit.save()
    subgreddiit.followers.push(req.body.userName)
    await subgreddiit.save()
    res.status(200).json(subgreddiit)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

const rejectSubgreddiit = async (req, res) => {
  const { title } = req.params
  try {
    const subgreddiit = await Subgreddiit.findOne({ title: title })
    console.log(req.body)
    subgreddiit.requests = subgreddiit.requests.filter(element => {
      element !== (req.body.userName)
    });
    await subgreddiit.save()
    res.status(200).json(subgreddiit)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

const delReportinSubgreddiit = async (req, res) => {
  const { title } = req.params
  try {
    console.log(req.body.postId, title)
    const subgreddiit = await Subgreddiit.findOne({ title: title })
    subgreddiit.reportedPosts = subgreddiit.reportedPosts.filter((report) => report.postId !== req.body.postId)
    subgreddiit.save()
    res.status(200).json(subgreddiit)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

const ignoreReportinSubgreddiit = async (req, res) => {
  const { title } = req.params
  try {
    console.log(req.body, title)
    const subgreddiit = await Subgreddiit.findOneAndUpdate({ title: title, "reportedPosts._id": req.body.postId, "reportedPosts.reportedBy": req.body.reportedBy }, {
      $set: {
        "reportedPosts.$.status": true
      }
    }, { new: true })

    console.log(subgreddiit)
    await subgreddiit.save()
    res.status(200).json(subgreddiit)
  } catch (err) {
    console.log(err.message)
    res.status(400).json({ error: err.message })
  }
}

const blockUserinReport = async (req, res) => {
  const { title } = req.params
  try {
    const subgreddiit = await Subgreddiit.findOneAndUpdate({ title }, {
      $addToSet: {
        blockedfollowers: req.body.blockusername
      },
      $pull: {
        followers: req.body.blockusername
      }
    }, {new: true})
    res.status(200).json(subgreddiit)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

module.exports = {
  createSubgreddiit,
  getSubgreddiits,
  getSubgreddiit,
  deleteSubgreddiit,
  acceptSubgreddiit,
  rejectSubgreddiit,
  delReportinSubgreddiit,
  ignoreReportinSubgreddiit,
  blockUserinReport
}