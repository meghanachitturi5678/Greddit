const User = require("../models/userModel")
const jwt = require("jsonwebtoken")

const createToken = (userName) => {
  return jwt.sign({ userName }, process.env.SECRET, { expiresIn: "7d" })
}

const signupUser = async (req, res) => {
  const { firstName, lastName, userName, password, age, phoneNumber } = req.body
  try {
    const user = await User.signup(firstName, lastName, userName, password, age, phoneNumber)
    const token = createToken(user.userName)
    res.status(200).json({ userName, token })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

const loginUser = async (req, res) => {
  const { userName, password } = req.body
  try {
    const user = await User.login(userName, password)
    const token = createToken(user.userName)
    res.status(200).json({ userName, token })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

const getUser = async (req, res) => {
  const userName = req.user.userName
  try {
    const user = await User.findOne({ userName })
    if (!user) {
      return res.status(404).json({ error: "no user found" })
    }
    res.status(200).json(user)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

const deleteUser = async (req, res) => {
  const userName = req.user.userName
  try {
    const user = await User.findOneAndDelete({ userName })
    if (!user) {
      return res.status(404).json({ error: "no user found" })
    }
    res.status(200).json(user)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

const updateUser = async (req, res) => {
  const userName = req.user.userName
  try {
    const user = await User.findOneAndUpdate({ userName }, {
      ...req.body
    }, { new: true })
    if (!user) {
      return res.status(404).json({ error: "no user found" })
    }
    res.status(200).json(user)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

const followUser = async (req, res) => {
  const userName = req.user.userName
  const { followUserName } = req.body
  try {
    await User.findOneAndUpdate({ userName: userName }, {
      $addToSet: {
        following: followUserName
      }
    })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }

  try {
    await User.findOneAndUpdate({ userName: followUserName }, {
      $addToSet: {
        followers: userName
      }
    })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }

  res.status(200).json({ mssg: `following ${followUserName}` })
}


const unfollowUser = async (req, res) => {
  const userName = req.user.userName
  const { unfollowUserName } = req.body
  try {
    await User.findOneAndUpdate({ userName: userName }, {
      $pull: {
        following: unfollowUserName
      }
    })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }

  try {
    await User.findOneAndUpdate({ userName: unfollowUserName }, {
      $pull: {
        followers: userName
      }
    })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }

  res.status(200).json({ mssg: `following ${unfollowUserName}` })
}


const removeFollower = async (req, res) => {
  const userName = req.user.userName
  const { removeUserName } = req.body
  try {
    await User.findOneAndUpdate({ userName: userName }, {
      $pull: {
        followers: removeUserName
      }
    })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }

  try {
    await User.findOneAndUpdate({ userName: removeUserName }, {
      $pull: {
        following: userName
      }
    })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }

  res.status(200).json({ mssg: `removed follower: ${removeUserName}` })
}

const savePost = async (req, res) => {
  const userName = req.user.userName
  const { postId } = req.params
  try {
    await User.findOneAndUpdate({ userName: userName }, {
      $addToSet: {
        savedposts: postId
      }
    })
    res.status(200).json({ mssg: "saved post" })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

const removePost = async (req, res) => {
  const userName = req.user.userName
  const { postId } = req.params
  try {
    await User.findOneAndUpdate({ userName: userName }, {
      $pull: {
        savedposts: postId
      }
    })
    res.status(200).json({ mssg: "removed saved post" })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

module.exports = {
  getUser,
  deleteUser,
  updateUser,
  signupUser,
  loginUser,
  followUser,
  unfollowUser,
  removeFollower,
  savePost,
  removePost
}