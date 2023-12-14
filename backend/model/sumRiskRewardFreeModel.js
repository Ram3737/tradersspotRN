const mongoose = require("mongoose");

const sumRiskRewardFreeSchema = new mongoose.Schema({
  totalRisk: { type: Number, default: 0 },
  totalReward: { type: Number, default: 0 },
});

const SumRiskRewardFree = mongoose.model(
  "SumRiskRewardFree",
  sumRiskRewardFreeSchema
);

module.exports = SumRiskRewardFree;
