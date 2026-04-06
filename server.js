require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Root route for health check
app.get("/", (req, res) => {
  res.send("EmergingTech Backend is LIVE and connected to MongoDB Atlas!");
});

// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/emergingtech";
mongoose.connect(MONGODB_URI)
  .then(() => console.log("Connected to MongoDB Atlas / Local"))
  .catch(err => console.error("Could not connect to MongoDB:", err));

// Student Schema
const studentSchema = new mongoose.Schema({
  student_id: { type: String, required: true },
  name: { type: String, required: true },
  course: String,
  mid_exam: Number,
  final_exam: Number,
  quiz: Number,
  assignment: Number,
  marks: Number,
  grade: String,
  comments: String,
  createdAt: { type: Date, default: Date.now }
});

const Student = mongoose.model("Student", studentSchema);

// Get result by name AND student ID
app.get("/result", async (req, res) => {
  const { name, id } = req.query;
  
  if (!name || !id) {
    return res.status(400).json({ message: "Name and ID are required" });
  }

  try {
    const result = await Student.findOne({
      student_id: id,
      name: { $regex: new RegExp(`^${name}$`, "i") }
    });

    if (result) {
      res.json(result);
    } else {
      res.status(404).json({ message: "Result not found for the given Name and ID" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error searching result", error: err.message });
  }
});

// Get all results
app.get("/results", async (req, res) => {
  try {
    const results = await Student.find().sort({ createdAt: -1 });
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: "Error fetching results", error: err.message });
  }
});

// Add or Update result
app.post("/add", async (req, res) => {
  try {
    const { student_id, name, course, mid_exam, final_exam, quiz, assignment, comments } = req.body;
    
    if (!student_id || !name) {
      return res.status(400).json({ message: "Student ID and Name are required" });
    }

    // 1. Fetch existing student to preserve other scores
    const existingStudent = await Student.findOne({ student_id });

    // 2. Parse scores (prioritizing new inputs, falling back to existing)
    const mid = parseFloat(mid_exam);
    if (!isNaN(mid) && (mid < 0 || mid > 30)) {
      return res.status(400).json({ message: "Mid Exam score must be between 0 and 30" });
    }
    const final = parseFloat(final_exam);
    if (!isNaN(final) && (final < 0 || final > 40)) {
      return res.status(400).json({ message: "Final Exam score must be between 0 and 40" });
    }
    const qz = parseFloat(quiz);
    
    // Assignment validation (0-20)
    const asgn = parseFloat(assignment);
    if (!isNaN(asgn) && (asgn < 0 || asgn > 20)) {
      return res.status(400).json({ message: "Assignment score must be between 0 and 20" });
    }
    
    // Determine combined scores
    const combinedMid = !isNaN(mid) ? mid : (existingStudent?.mid_exam || null);
    const combinedFinal = !isNaN(final) ? final : (existingStudent?.final_exam || null);
    const combinedQuiz = !isNaN(qz) ? qz : (existingStudent?.quiz || null);
    const combinedAsgn = !isNaN(asgn) ? asgn : (existingStudent?.assignment || null);

    // 3. Calculate total marks
    let totalMarks = 0;
    if (combinedMid !== null) totalMarks += combinedMid;
    if (combinedFinal !== null) totalMarks += combinedFinal;
    if (combinedQuiz !== null) totalMarks += combinedQuiz;
    if (combinedAsgn !== null) totalMarks += combinedAsgn;

    // 4. Set Grade to 'Pending' for all
    let grade = 'Pending';

    const updateData = {
      name,
      course,
      marks: totalMarks,
      grade: grade,
      comments: comments !== undefined ? comments : (existingStudent?.comments || "")
    };

    if (combinedMid !== null) updateData.mid_exam = combinedMid;
    if (combinedFinal !== null) updateData.final_exam = combinedFinal;
    if (combinedQuiz !== null) updateData.quiz = combinedQuiz;
    if (combinedAsgn !== null) updateData.assignment = combinedAsgn;

    const result = await Student.findOneAndUpdate(
      { student_id },
      { $set: updateData },
      { upsert: true, new: true, runValidators: true }
    );

    res.json({ message: "Result registered/updated successfully", data: result });
  } catch (err) {
    res.status(400).json({ message: "Error registering result", error: err.message });
  }
});

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});