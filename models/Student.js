const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  student_id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  course: String,
  department: { type: String, enum: ['pharmacy', 'nursing'], default: 'pharmacy' },
  mid_exam: Number,
  final_exam: Number,
  quiz: Number,
  assignment: Number,
  marks: Number,
  grade: String,
  comments: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Student", studentSchema);
