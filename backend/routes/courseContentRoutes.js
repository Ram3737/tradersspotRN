const express = require("express");
const router = express.Router();
const courseContentController = require("../controller/courseContentController");

router.get("/getCourseContent", courseContentController.courseContent);

module.exports = router;
