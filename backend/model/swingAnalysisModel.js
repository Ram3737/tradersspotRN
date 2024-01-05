const mongoose = require("mongoose");

const SwingAnalysisSchema = new mongoose.Schema(
  {
    stockName: {
      type: String,
      required: true,
    },
    pattern: {
      type: String,
      required: true,
    },
    analysisLink: {
      type: String,
      required: true,
    },
  },
  {
    _id: false,
  }
);

const resultSchema = new mongoose.Schema(
  {
    risk: {
      type: Number,
      required: false,
    },
    reward: {
      type: Number,
      required: false,
    },
    percentage: {
      type: Number,
      required: false,
    },
    breakout: {
      type: Boolean,
      required: false,
    },
    canSharetoAll: {
      type: Boolean,
      required: false,
    },
    resultLink: {
      type: String,
      required: false,
    },
  },
  {
    _id: false,
  }
);

const swingAnalysisResult = new mongoose.Schema(
  {
    analysis: {
      type: SwingAnalysisSchema,
      required: false,
    },
    result: {
      type: resultSchema,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const SwingAnalysisResult = mongoose.model(
  "SwingAnalysisResult",
  swingAnalysisResult
);

module.exports = SwingAnalysisResult;
