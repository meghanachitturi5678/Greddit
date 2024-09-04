const express = require("express")
const {
  createSubgreddiit,
  getSubgreddiits,
  getSubgreddiit,
  deleteSubgreddiit,
  acceptSubgreddiit,
  rejectSubgreddiit,
  delReportinSubgreddiit,
  ignoreReportinSubgreddiit,
  blockUserinReport
} = require("../controllers/mysubgreddiitController")

const requireAuth = require("../middleware/requireAuth")

const router = express.Router()

router.use(requireAuth)

router.get("/", getSubgreddiits)
router.get("/:title", getSubgreddiit)
router.post("/", createSubgreddiit)
router.delete("/:title", deleteSubgreddiit)
router.patch("/accept/:title", acceptSubgreddiit)
router.patch("/reject/:title", rejectSubgreddiit)
router.patch("/delete/report/:title", delReportinSubgreddiit)
router.patch("/ignore/report/:title", ignoreReportinSubgreddiit)
router.patch("/block/report/:title", blockUserinReport)

module.exports = router