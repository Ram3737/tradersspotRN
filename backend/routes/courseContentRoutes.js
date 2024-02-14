const express = require("express");
const router = express.Router();
const courseContentController = require("../controller/courseContentController");

router.get("/technical-course-content", courseContentController.courseContent);

module.exports = router;
