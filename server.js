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
    const { student_id, name, course, mid_exam, final_exam, comments } = req.body;
    
    if (!student_id || !name) {
      return res.status(400).json({ message: "Student ID and Name are required" });
    }

    const mid = parseFloat(mid_exam);
    const final = parseFloat(final_exam);
    
    let totalMarks = 0;
    let grade = 'Pending';

    // Sum scores safely
    if (!isNaN(mid)) totalMarks += mid;
    if (!isNaN(final)) totalMarks += final;

    // Only assign a final grade if the final exam is recorded
    if (!isNaN(final)) {
      if (totalMarks >= 90) grade = 'A+';
      else if (totalMarks >= 83) grade = 'A';
      else if (totalMarks >= 75) grade = 'B+';
      else if (totalMarks >= 68) grade = 'B';
      else if (totalMarks >= 60) grade = 'C+';
      else if (totalMarks >= 50) grade = 'C';
      else if (totalMarks >= 45) grade = 'D';
      else grade = 'F';
    }

    const updateData = {
      name,
      course,
      marks: totalMarks,
      grade: grade,
      comments: comments || ""
    };

    // Only add exams if they were actually provided (to avoid overwriting with 0)
    if (!isNaN(mid)) updateData.mid_exam = mid;
    if (!isNaN(final)) updateData.final_exam = final;

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