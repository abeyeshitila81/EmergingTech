const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  student_id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  course: String,
  department: { type: String, enum: ['pharmacy', 'nursing'], default: 'pharmacy' },
  batch: { type: String, default: '2016' },
  mid_exam: Number,
  final_exam: Number,
  quiz: Number,
  assignment: Number,
  marks: Number,
  grade: String,
  comments: String,
  pin: { type: String, default: () => Math.floor(1000 + Math.random() * 9000).toString() },
  has_logged_in: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Student", studentSchema);
