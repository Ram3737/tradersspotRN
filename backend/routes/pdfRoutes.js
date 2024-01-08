const express = require("express");
const router = express.Router();
const pdfController = require("../controller/pdfController");

router.get(
  "/download-trading-guide-pdf",
  pdfController.downloadTradingGuidePdf
);

router.get(
  "/download-trading-in-the-zone-pdf",
  pdfController.downloadTradingInTheZonePdf
);

router.get(
  "/download-day-trade-for-a-living-pdf",
  pdfController.downloadDayTradeForaLivingPdf
);

router.get(
  "/download-ultimate-candlesticks-pdf",
  pdfController.downloadUltimateCandlesticksPdf
);
module.exports = router;
