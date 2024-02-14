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
  "/swing-analysis/create-swing-analysis",
  swingAnalysisResultController.createSwingAnalysis
);
router.get(
  "/swing-analysis/get-all-swing-analysis",
  swingAnalysisResultController.getAllSwingAnalysis
);
router.get(
  "/swing-analysis/get-all-swing-analysis-user",
  swingAnalysisResultController.getAllSwingAnalysisUser
);
router.patch(
  "/swing-analysis/update-swing-analysis/:id",
  swingAnalysisResultController.updateSwingResults
);
router.get(
  "/swing-analysis/sum-risk-reward-swing",
  swingAnalysisResultController.sumRiskRewardSwing
);

router.delete(
  "/swing-analysis/delete-swing-analysis/:id",
  swingAnalysisResultController.deleteSwingAnalysis
);

//FREE SWING
router.post(
  "/free-swing-analysis/create-free-swing-analysis",
  freeSwingAnalysisResultController.createFreeSwingAnalysis
);
router.get(
  "/free-swing-analysis/get-all-free-swing-analysis",
  freeSwingAnalysisResultController.getAllFreeSwingAnalysis
);
router.get(
  "/free-swing-analysis/get-all-free-swing-analysis-user",
  freeSwingAnalysisResultController.getAllFreeSwingAnalysisUser
);
router.patch(
  "/free-swing-analysis/update-free-swing-analysis/:id",
  freeSwingAnalysisResultController.updateFreeSwingResults
);
router.get(
  "/free-swing-analysis/sum-risk-reward-free-swing",
  freeSwingAnalysisResultController.sumRiskRewardFreeSwing
);

router.delete(
  "/free-swing-analysis/delete-free-swing-analysis/:id",
  freeSwingAnalysisResultController.deleteFreeSwingAnalysis
);

module.exports = router;
