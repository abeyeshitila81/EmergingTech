const Student = require("../models/Student");
const Setting = require("../models/Setting");

// Helper to get or create setting
const getSetting = async (key, defaultValue) => {
  let setting = await Setting.findOne({ key });
  if (!setting) {
    setting = await Setting.create({ key, value: defaultValue });
  }
  return setting;
};

const adminPassword = process.env.VITE_ADMIN_PASSWORD || process.env.ADMIN_PASSWORD || "admin123abe";

exports.getPublicAccess = async (req, res) => {
  try {
    const setting = await getSetting("public_access", false);
    res.json({ publicAccess: setting.value });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.togglePublicAccess = async (req, res) => {
  const authHeader = req.headers['x-admin-password'];
  if (authHeader !== adminPassword) {
    return res.status(401).json({ message: 'Unauthorized: Admin access required' });
  }
  
  try {
    const setting = await getSetting("public_access", false);
    const newValue = !setting.value;
    
    await Setting.findOneAndUpdate(
      { key: "public_access" },
      { $set: { value: newValue } },
      { new: true }
    );
    
    res.json({ publicAccess: newValue });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get result by name AND student ID
exports.getResult = async (req, res) => {
  const { name, id } = req.query;
  const publicAccessSetting = await getSetting("public_access", false);

  if (!name || !id) {
    return res.status(400).json({ message: "Name and ID are required" });
  }

  // If system is private, only admin can search (or if admin header is present)
  const authHeader = req.headers['x-admin-password'];
  if (authHeader !== adminPassword && !publicAccessSetting.value) {
    return res.status(403).json({ message: "Access Restricted: Result lookup is currently private." });
  }

  try {
    const result = await Student.findOne({
      student_id: id,
      name: { $regex: new RegExp(name, "i") }
    });

    if (result) {
      let responseData = result.toObject();
      res.json(responseData);
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
  
  // Strictly Admin-Only for the full directory
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
    const { student_id, name, course, department, batch, mid_exam, final_exam, quiz, assignment, other, comments } = req.body;
    
    if (!student_id || !name) {
      return res.status(400).json({ message: "Student ID and Name are required" });
    }

    const existingStudent = await Student.findOne({ student_id });

    const mid = parseFloat(mid_exam);
    const final = parseFloat(final_exam);
    const q = parseFloat(quiz);
    const a = parseFloat(assignment);
    const o = parseFloat(other);
    
    const combinedMid = !isNaN(mid) ? mid : (existingStudent?.mid_exam ?? null);
    const combinedFinal = !isNaN(final) ? final : (existingStudent?.final_exam ?? null);
    const combinedQuiz = !isNaN(q) ? q : (existingStudent?.quiz ?? null);
    const combinedAssignment = !isNaN(a) ? a : (existingStudent?.assignment ?? null);
    const combinedOther = !isNaN(o) ? o : (existingStudent?.other ?? null);

    let totalMarks = 0;
    if (combinedMid !== null) totalMarks += combinedMid;
    if (combinedFinal !== null) totalMarks += combinedFinal;
    if (combinedQuiz !== null) totalMarks += combinedQuiz;
    if (combinedAssignment !== null) totalMarks += combinedAssignment;
    if (combinedOther !== null) totalMarks += combinedOther;

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
      department: department || existingStudent?.department || 'pharmacy',
      batch: batch || existingStudent?.batch || '2016',
      marks: totalMarks,
      grade: grade,
      comments: comments !== undefined ? comments : (existingStudent?.comments || "")
    };

    if (combinedMid !== null) updateData.mid_exam = combinedMid;
    if (combinedFinal !== null) updateData.final_exam = combinedFinal;
    if (combinedQuiz !== null) updateData.quiz = combinedQuiz;
    if (combinedAssignment !== null) updateData.assignment = combinedAssignment;
    if (combinedOther !== null) updateData.other = combinedOther;

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

