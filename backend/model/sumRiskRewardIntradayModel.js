const mongoose = require("mongoose");

const sumRiskRewardIntradaySchema = new mongoose.Schema({
  totalRisk: { type: Number, default: 0 },
  totalReward: { type: Number, default: 0 },
});

const SumRiskRewardIntraday = mongoose.model(
  "SumRiskRewardIntraday",
  sumRiskRewardIntradaySchema
);

module.exports = SumRiskRewardIntraday;
