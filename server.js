require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

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

// Add new result
app.post("/add", async (req, res) => {
  try {
    const { mid_exam, final_exam } = req.body;
    
    // Calculate total marks
    const totalMarks = (parseFloat(mid_exam) || 0) + (parseFloat(final_exam) || 0);

    // Calculate Grade
    let grade = 'F';
    if (totalMarks >= 90) grade = 'A+';
    else if (totalMarks >= 83) grade = 'A';
    else if (totalMarks >= 75) grade = 'B+';
    else if (totalMarks >= 68) grade = 'B';
    else if (totalMarks >= 60) grade = 'C+';
    else if (totalMarks >= 50) grade = 'C';
    else if (totalMarks >= 45) grade = 'D';

    const newStudent = new Student({
      ...req.body,
      marks: totalMarks,
      grade: grade,
      comments: req.body.comments || ""
    });

    await newStudent.save();
    res.json({ message: "Result added successfully", data: newStudent });
  } catch (err) {
    res.status(400).json({ message: "Error adding result", error: err.message });
  }
});

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});