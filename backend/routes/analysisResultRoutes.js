const express = require("express");
const router = express.Router();
const intradayAnalysisResultController = require("../controller/intradayAnalysisResultController");
const freeAnalysisResultController = require("../controller/freeAnalysisResultController");

//INTRADAY
router.post(
  "/createIntradayAnalysis",
  intradayAnalysisResultController.createIntradayAnalysis
);
router.get(
  "/getAllIntradayAnalysis",
  intradayAnalysisResultController.getAllIntradayAnalysis
);
router.patch(
  "/updateIntradayResults/:id",
  intradayAnalysisResultController.updateIntradayResults
);
router.get(
  "/sumRiskRewardIntraday",
  intradayAnalysisResultController.sumRiskRewardIntraday
);

//FREE
router.post(
  "/createFreeAnalysis",
  freeAnalysisResultController.createFreeAnalysis
);
router.get(
  "/getAllFreeAnalysis",
  freeAnalysisResultController.getAllFreeAnalysis
);
router.patch(
  "/updateFreeResults/:id",
  freeAnalysisResultController.updateFreeResults
);
router.get(
  "/sumRiskRewardFree",
  freeAnalysisResultController.sumRiskRewardFree
);

module.exports = router;
