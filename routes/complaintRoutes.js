const express = require("express");
const router = express.Router();

const {
  createComplaint,
  getStudentComplaints,
  updateStatus
} = require("../controllers/complaintController");

// Create complaint
router.post("/", createComplaint);

// Get complaints of a student
router.get("/student/:studentId", getStudentComplaints);

// Update complaint status (admin)
router.put("/:id/status", updateStatus);

module.exports = router;
