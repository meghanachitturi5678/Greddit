const express = require("express")
const {
  getUsers,
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
} = require("../controllers/userController")

const requireAuth = require("../middleware/requireAuth")

const router = express.Router()

router.post("/login", loginUser)
router.post("/signup", signupUser)

router.use(requireAuth)

router.get("/", getUser)
router.delete("/", deleteUser)
router.patch("/", updateUser)
router.patch("/follow", followUser)
router.patch("/unfollow", unfollowUser)
router.patch("/remove", removeFollower)
router.patch("/save/:postId", savePost)
router.patch("/remove/:postId", removePost)

module.exports = router