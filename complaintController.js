const Complaint = require("../models/Complaint");

// Create complaint
exports.createComplaint = async (req, res) => {
  try {
    const { title, description, studentId } = req.body;

    const complaint = await Complaint.create({
      title,
      description,
      studentId,
      status: "Pending"
    });

    res.status(201).json({
      message: "Complaint submitted successfully",
      complaint
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get complaints of one student
exports.getStudentComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({
      studentId: req.params.studentId
    });

    res.json(complaints);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update status (admin)
exports.updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const complaint = await Complaint.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    res.json({ message: "Status updated", complaint });
  } catch (error) {
    res.status(500).json({ message: "Error updating status" });
  }
};
