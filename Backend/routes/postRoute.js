const express = require("express")
const {
  getPostById,
  createPost,
  deletePost,
  getPost,
  addComment,
  addUpvote,
  addDownvote,
  getUserPosts
} = require("../controllers/postController")

const requireAuth = require("../middleware/requireAuth")

const router = express.Router()

router.use(requireAuth)

router.get("/id/:_id", getPostById)
router.get("/subgreddiit/:title", getPost)
router.get("/leave/:title", getUserPosts)
router.post("/", createPost)
router.delete("/:_id", deletePost)
router.patch("/comment/:_id", addComment)
router.patch("/add/upvote/:_id", addUpvote)
router.patch("/add/downvote/:_id", addDownvote)

module.exports = router