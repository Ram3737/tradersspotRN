const mongoose = require("mongoose");

const sumRiskRewardFreeSwingSchema = new mongoose.Schema({
  totalRisk: { type: Number, default: 0 },
  totalReward: { type: Number, default: 0 },
});

const SumRiskRewardFreeSwing = mongoose.model(
  "SumRiskRewardFreeSwing",
  sumRiskRewardFreeSwingSchema
);

module.exports = SumRiskRewardFreeSwing;
