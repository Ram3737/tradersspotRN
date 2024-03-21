const express = require("express");
const router = express.Router();
const courseContentController = require("../controller/courseContentController");
const technicalCourseAuth = require("../utils/courseControllerAuth/technicalCourseAuth");
const fundamentalPaidCourseAuth = require("../utils/courseControllerAuth/fundamentalPaidCourseAuth");
const fundamentalFreeCourseAuth = require("../utils/courseControllerAuth/fundamentalFreeCourseAuth");

router.get(
  "/technical-course-content",
  technicalCourseAuth,
  courseContentController.courseContentTechnical
);

router.get(
  "/technical-course-content-web",
  technicalCourseAuth,
  courseContentController.courseContentTechnicalWeb
);

router.get(
  "/fundamental-paid-course-content",
  fundamentalPaidCourseAuth,
  courseContentController.courseContentFundamentalPaid
);

router.get(
  "/fundamental-free-course-content",
  fundamentalFreeCourseAuth,
  courseContentController.courseContentFundamentalFree
);

module.exports = router;
