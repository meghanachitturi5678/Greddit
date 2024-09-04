const Subgreddiit = require("../models/subgreddiitModel")

const getSubgreddiits = async (req, res) => {
  try {
    const subgreddiit = await Subgreddiit.find({}).sort({ "createdAt": -1 })
    res.status(200).json(subgreddiit)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

const getSubgreddiit = async (req, res) => {
  const { title } = req.params
  try {
    const subgreddiit = await Subgreddiit.findOne({ title: title })
    if (!subgreddiit) {
      return res.status(404).json({ error: "no subgreddiit found" })
    }
    res.status(200).json(subgreddiit)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

const requestSubgreddiit = async (req, res) => {
  const { title } = req.params
  try {
    await Subgreddiit.findOneAndUpdate({ title: title }, {
      $addToSet: {
        requests: req.body.userName
      }
    })
    res.status(200).json({ mssg: "requested" })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

const cancelReqSubgreddiit = async (req, res) => {
  const { title } = req.params
  try {
    await Subgreddiit.findOneAndUpdate({ title: title }, {
      $pull: {
        requests: req.body.userName
      }
    })
    res.status(200).json({ mssg: "left subgreddiit" })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

const leaveSubgreddiit = async (req, res) => {
  const { title } = req.params
  try {
    await Subgreddiit.findOneAndUpdate({ title: title }, {
      $pull: {
        followers: req.body.userName
      }
    })
    res.status(200).json({ mssg: "left subgreddiit" })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

const addPostinSubgreddiit = async (req, res) => {
  const { title } = req.params
  try {
    await Subgreddiit.findOneAndUpdate({ title: title }, {
      $addToSet: {
        post: req.body._id
      }
    })
    res.status(200).json({ mssg: "added post in subgreddiit" })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

const delPostinSubgreddiit = async (req, res) => {
  const { title } = req.params
  try {
    await Subgreddiit.findOneAndUpdate({ title: title }, {
      $pull: {
        post: req.body._id
      }
    })
    res.status(200).json({ mssg: "deleted post in subgreddiit" })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

const reportPostinSubgreddiit = async (req, res) => {
  const userName = req.user.userName
  if (userName === req.body.postUser) {
    return res.status(400).json({error: "cannot report your own post"})
  }
  const { title } = req.params
  try {
    console.log(req.body.postId, title)
    const subgreddiit = await Subgreddiit.findOneAndUpdate({ title: title }, {
      $addToSet: {
        reportedPosts: { postId: req.body.postId, reportedBy: userName, concern: req.body.concern, status: req.body.status }
      }
    }, { new: true })
    res.status(200).json(subgreddiit)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

module.exports = {
  getSubgreddiits,
  getSubgreddiit,
  requestSubgreddiit,
  cancelReqSubgreddiit,
  leaveSubgreddiit,
  addPostinSubgreddiit,
  delPostinSubgreddiit,
  reportPostinSubgreddiit,
}