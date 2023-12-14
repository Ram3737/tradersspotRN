const mongoose = require("mongoose");

const FreeAnalysisSchema = new mongoose.Schema(
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
    resultLink: {
      type: String,
      required: false,
    },
  },
  {
    _id: false,
  }
);

const freeAnalysisResult = new mongoose.Schema(
  {
    analysis: {
      type: FreeAnalysisSchema,
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

const FreeAnalysisResult = mongoose.model(
  "FreeAnalysisResult",
  freeAnalysisResult
);

module.exports = FreeAnalysisResult;
