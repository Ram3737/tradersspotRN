const express = require("express");
const router = express.Router();
const pdfController = require("../controller/pdfController");

router.get("/downloadPdf", pdfController.downloadPdf);

module.exports = router;
