const express = require("express")
const {
  getSubgreddiits,
  getSubgreddiit,
  requestSubgreddiit,
  cancelReqSubgreddiit,
  leaveSubgreddiit,
  addPostinSubgreddiit,
  delPostinSubgreddiit,
  reportPostinSubgreddiit,
} = require("../controllers/subgreddiitController")

const requireAuth = require("../middleware/requireAuth")

const router = express.Router()

router.use(requireAuth)

router.get("/", getSubgreddiits)
router.get("/:title", getSubgreddiit)
router.patch("/request/:title", requestSubgreddiit)
router.patch("/leave/:title", leaveSubgreddiit)
router.patch("/cancel/:title", cancelReqSubgreddiit)
router.patch("/post/:title", addPostinSubgreddiit)
router.patch("/post/leave/:title", delPostinSubgreddiit)
router.patch("/report/:title", reportPostinSubgreddiit)

module.exports = router