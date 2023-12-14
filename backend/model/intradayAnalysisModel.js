const mongoose = require("mongoose");

const IntradayAnalysisSchema = new mongoose.Schema(
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

const intradayAnalysisResult = new mongoose.Schema(
  {
    analysis: {
      type: IntradayAnalysisSchema,
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

const IntradayAnalysisResult = mongoose.model(
  "IntradayAnalysisResult",
  intradayAnalysisResult
);

module.exports = IntradayAnalysisResult;
