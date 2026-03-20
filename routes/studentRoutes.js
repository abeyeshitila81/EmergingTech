const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");

router.get("/result", studentController.getResult);
router.get("/results", studentController.getAllResults);
router.post("/add", studentController.addOrUpdateResult);
router.delete("/delete/:id", studentController.deleteResult);

module.exports = router;
