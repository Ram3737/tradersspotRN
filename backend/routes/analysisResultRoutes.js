const express = require("express");
const router = express.Router();
const intradayAnalysisResultController = require("../controller/intradayAnalysisResultController");
const freeAnalysisResultController = require("../controller/freeAnalysisResultController");
const swingAnalysisResultController = require("../controller/swingAnalysisResultController");
const freeSwingAnalysisResultController = require("../controller/freeSwingAnalysisResultController");

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

//SWING
router.post(
  "/createSwingAnalysis",
  swingAnalysisResultController.createSwingAnalysis
);
router.get(
  "/getAllSwingAnalysis",
  swingAnalysisResultController.getAllSwingAnalysis
);
router.get(
  "/getAllSwingAnalysisUser",
  swingAnalysisResultController.getAllSwingAnalysisUser
);
router.patch(
  "/updateSwingResults/:id",
  swingAnalysisResultController.updateSwingResults
);
router.get(
  "/sumRiskRewardSwing",
  swingAnalysisResultController.sumRiskRewardSwing
);

router.delete(
  "/deleteSwingAnalysis/:id",
  swingAnalysisResultController.deleteSwingAnalysis
);

//FREE SWING
router.post(
  "/createFreeSwingAnalysis",
  freeSwingAnalysisResultController.createFreeSwingAnalysis
);
router.get(
  "/getAllFreeSwingAnalysis",
  freeSwingAnalysisResultController.getAllFreeSwingAnalysis
);
router.get(
  "/getAllFreeSwingAnalysisUser",
  freeSwingAnalysisResultController.getAllFreeSwingAnalysisUser
);
router.patch(
  "/updateFreeSwingResults/:id",
  freeSwingAnalysisResultController.updateFreeSwingResults
);
router.get(
  "/sumRiskRewardFreeSwing",
  freeSwingAnalysisResultController.sumRiskRewardFreeSwing
);

router.delete(
  "/deleteFreeSwingAnalysis/:id",
  freeSwingAnalysisResultController.deleteFreeSwingAnalysis
);

module.exports = router;
