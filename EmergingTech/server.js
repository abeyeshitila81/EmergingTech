const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Sample Data (you can later connect database)
let results = [
  {
    student_id: "101",
    name: "Abebe",
    course: "IT Fundamentals",
    marks: 85,
    grade: "A"
  },
  {
    student_id: "102",
    name: "Kebede",
    course: "Networking",
    marks: 70,
    grade: "B"
  }
];

// Get result by student ID
app.get("/result/:id", (req, res) => {
  const id = req.params.id;
  const result = results.find(r => r.student_id === id);

  if (result) {
    res.json(result);
  } else {
    res.status(404).json({ message: "Result not found" });
  }
});

// Add new result (admin)
app.post("/add", (req, res) => {
  const newResult = req.body;
  results.push(newResult);
  res.json({ message: "Result added successfully" });
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});