const Student = require("../models/Student");
const adminPassword = process.env.VITE_ADMIN_PASSWORD || process.env.ADMIN_PASSWORD || "admin123";

// Get result by name AND student ID
exports.getResult = async (req, res) => {
  const { name, id } = req.query;
  
  if (!name || !id) {
    return res.status(400).json({ message: "Name and ID are required" });
  }

  try {
    const result = await Student.findOne({
      student_id: id,
      name: { $regex: new RegExp(name, "i") }
    });

    if (result) {
      res.json(result);
    } else {
      res.status(404).json({ message: "Result not found for the given Name and ID" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error searching result", error: err.message });
  }
};

// Get all results
exports.getAllResults = async (req, res) => {
  const authHeader = req.headers['x-admin-password'];
  if (authHeader !== adminPassword) {
    return res.status(401).json({ message: "Unauthorized: Admin access required" });
  }
  try {
    const results = await Student.find().sort({ createdAt: -1 });
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: "Error fetching results", error: err.message });
  }
};

// Add or Update result
exports.addOrUpdateResult = async (req, res) => {
  const authHeader = req.headers['x-admin-password'];
  if (authHeader !== adminPassword) {
    return res.status(401).json({ message: "Unauthorized: Admin access required" });
  }
  try {
    const { student_id, name, course, mid_exam, final_exam, quiz, assignment, comments } = req.body;
    
    if (!student_id || !name) {
      return res.status(400).json({ message: "Student ID and Name are required" });
    }

    const existingStudent = await Student.findOne({ student_id });

    const mid = parseFloat(mid_exam);
    const final = parseFloat(final_exam);
    const q = parseFloat(quiz);
    const a = parseFloat(assignment);
    
    const combinedMid = !isNaN(mid) ? mid : (existingStudent?.mid_exam || null);
    const combinedFinal = !isNaN(final) ? final : (existingStudent?.final_exam || null);
    const combinedQuiz = !isNaN(q) ? q : (existingStudent?.quiz || null);
    const combinedAssignment = !isNaN(a) ? a : (existingStudent?.assignment || null);

    let totalMarks = 0;
    if (combinedMid !== null) totalMarks += combinedMid;
    if (combinedFinal !== null) totalMarks += combinedFinal;
    if (combinedQuiz !== null) totalMarks += combinedQuiz;
    if (combinedAssignment !== null) totalMarks += combinedAssignment;

    let grade = 'Pending';
    if (combinedFinal !== null) {
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
      comments: comments !== undefined ? comments : (existingStudent?.comments || "")
    };

    if (combinedMid !== null) updateData.mid_exam = combinedMid;
    if (combinedFinal !== null) updateData.final_exam = combinedFinal;
    if (combinedQuiz !== null) updateData.quiz = combinedQuiz;
    if (combinedAssignment !== null) updateData.assignment = combinedAssignment;

    const result = await Student.findOneAndUpdate(
      { student_id },
      { $set: updateData },
      { upsert: true, new: true, runValidators: true }
    );

    res.json({ message: "Result registered/updated successfully", data: result });
  } catch (err) {
    res.status(400).json({ message: "Error registering result", error: err.message });
  }
};

// Delete result
exports.deleteResult = async (req, res) => {
  const authHeader = req.headers['x-admin-password'];
  if (authHeader !== adminPassword) {
    return res.status(401).json({ message: "Unauthorized: Admin access required" });
  }
  try {
    const { id } = req.params;
    const result = await Student.findOneAndDelete({ student_id: id });
    if (!result) {
      return res.status(404).json({ message: "Student record not found" });
    }
    res.json({ message: "Student record deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting record", error: err.message });
  }
};
