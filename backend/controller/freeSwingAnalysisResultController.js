const FreeSwingAnalysisResult = require("../model/freeSwingAnalysisModel");
const SumRiskRewardFreeSwing = require("../model/sumRiskRewardFreeSwingModel");
const mongoose = require("mongoose");

const createFreeSwingAnalysis = async (req, res) => {
  try {
    const { analysis, result } = req.body;
    const newFreeSwingAnalysisResult = new FreeSwingAnalysisResult({
      analysis: {
        stockName: analysis.stockName,
        pattern: analysis.pattern,
        analysisLink: analysis.analysisLink,
      },
      result: {
        risk: result.risk,
        reward: result.reward,
        percentage: result.percentage,
        canSharetoAll: result.canSharetoAll,
        breakout: result.breakout,
        resultLink: result.resultLink,
      },
    });

    const savedFreeSwingAnalysisResult =
      await newFreeSwingAnalysisResult.save();

    res.status(201).json({ message: "analysis created" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllFreeSwingAnalysis = async (req, res) => {
  try {
    const page = req.query.page;
    const searchedId = req.query.search || null;
    const limit = req.query.limit || 10;
    const skip = (page - 1) * limit;

    const breakoutValue = req.query.breakout;
    const rewardValue = req.query.reward;
    const analysisLinkValue = req.query.analysisLink;
    const resultLinkValue = req.query.resultLink;

    let query = [];

    if (analysisLinkValue !== "null") {
      console.log("0");
      query.push({ "result.resultLink": null });
      query.push({ "result.breakout": "none" });
    }

    if (resultLinkValue !== "null") {
      console.log("1");
      query.push({ "result.resultLink": "none" });
    }

    if (
      analysisLinkValue == "null" &&
      breakoutValue &&
      breakoutValue !== "null"
    ) {
      console.log("2");
      query.push({ ["result.breakout"]: breakoutValue });
    }

    if (rewardValue && rewardValue !== "null" && rewardValue == 0) {
      console.log("3");
      query.push({ ["result.reward"]: rewardValue });
    }

    if (rewardValue && rewardValue == 1) {
      console.log("4");
      query.push({ ["result.reward"]: { $gt: 0 } });
    }

    console.log("sumRRfree", query);

    if (searchedId) {
      const objectId = new mongoose.Types.ObjectId(searchedId);
      const allSwingAnalyses = await FreeSwingAnalysisResult.find({
        _id: objectId,
      })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

      const totalSwingAnalysis = 1;

      res.status(200).json({ totalSwingAnalysis, allSwingAnalyses });
    } else {
      const allSwingAnalyses = await FreeSwingAnalysisResult.find(
        query.length === 0
          ? {}
          : query.length > 0 && analysisLinkValue == "null"
          ? { $or: query }
          : query.length > 0 && analysisLinkValue == 1
          ? { $and: query }
          : {}
      )
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);
      const totalSwingAnalysis = await FreeSwingAnalysisResult.countDocuments(
        query.length === 0
          ? {}
          : query.length > 0 && analysisLinkValue == "null"
          ? { $or: query }
          : query.length > 0 && analysisLinkValue == 1
          ? { $and: query }
          : {}
      );

      res.status(200).json({ totalSwingAnalysis, allSwingAnalyses });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllFreeSwingAnalysisUser = async (req, res) => {
  try {
    const page = req.query.page;
    const limit = req.query.limit || 100;
    const skip = (page - 1) * limit;

    const breakoutValue = req.query.breakout;
    const rewardValue = req.query.reward;
    const analysisLinkValue = req.query.analysisLink;
    const resultLinkValue = req.query.resultLink;

    let query = [];

    if (analysisLinkValue !== "null") {
      console.log("0");
      query.push({ "result.resultLink": null });
      query.push({ "result.breakout": "none" });
    }

    if (resultLinkValue !== "null") {
      console.log("1");
      query.push({ "result.resultLink": "none" });
    }

    if (
      analysisLinkValue == "null" &&
      breakoutValue &&
      breakoutValue !== "null"
    ) {
      console.log("2");
      query.push({ ["result.breakout"]: breakoutValue });
    }

    if (rewardValue && rewardValue !== "null" && rewardValue == 0) {
      console.log("3");
      query.push({ ["result.reward"]: rewardValue });
    }

    if (rewardValue && rewardValue == 1) {
      console.log("4");
      query.push({ ["result.reward"]: { $gt: 0 } });
    }

    console.log("free", query);

    const allSwingAnalyses = await FreeSwingAnalysisResult.find(
      query.length === 0
        ? {}
        : query.length > 0 && analysisLinkValue == "null"
        ? { $or: query }
        : query.length > 0 && analysisLinkValue == 1
        ? { $and: query }
        : {}
    )
      .sort({ createdAt: -1 })
      .limit(limit);
    const totalSwingAnalysis = await FreeSwingAnalysisResult.countDocuments(
      query.length === 0
        ? {}
        : query.length > 0 && analysisLinkValue == "null"
        ? { $or: query }
        : query.length > 0 && analysisLinkValue == 1
        ? { $and: query }
        : {}
    );

    res.status(200).json({ totalSwingAnalysis, allSwingAnalyses });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateFreeSwingResults = async (req, res) => {
  try {
    const { id: userId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(404).send({ error: "Analysis not found!" });
    }

    const analysis = await FreeSwingAnalysisResult.findByIdAndUpdate(
      userId,
      req.body
    );
    await analysis.save();

    res.status(201).json({
      message: "Analysis Updated",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error - Try after sometime" });
  }
};

const deleteFreeSwingAnalysis = async (req, res) => {
  try {
    const { id: analysisId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(analysisId)) {
      return res.status(404).json({ error: "Analysis not found!" });
    }

    const deletedAnalysis = await FreeSwingAnalysisResult.findByIdAndDelete(
      analysisId
    );

    if (!deletedAnalysis) {
      return res.status(404).json({ error: "Analysis not found!" });
    }

    res.status(200).json({ message: "Analysis deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

function getMonthName(monthIndex) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return months[monthIndex];
}

const sumRiskRewardFreeSwing = async (req, res) => {
  try {
    const allFreeSwingAnalyses = await FreeSwingAnalysisResult.find();
    const totalSwingAnalysisCount =
      await FreeSwingAnalysisResult.countDocuments();

    // if (!allFreeSwingAnalyses || allFreeSwingAnalyses.length === 0) {
    //   throw new Error("No analyses found to calculate sum");
    // }

    const onlyBreakoutAnalyses = allFreeSwingAnalyses.filter(
      (analysis) => analysis.result.breakout !== "none"
    );

    const currentDate = new Date();

    const currentWeekStart = new Date(currentDate);
    currentWeekStart.setDate(currentDate.getDate() - currentDate.getDay());
    const currentWeekEnd = new Date(currentDate);
    currentWeekEnd.setDate(
      currentWeekEnd.getDate() + (6 - currentWeekEnd.getDay())
    );
    currentWeekEnd.setHours(23, 59, 59, 999);

    const lastMonthStart = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      1
    );
    const lastMonthEnd = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      0
    );
    lastMonthEnd.setDate(lastMonthEnd.getDate() + 1);

    const currentDayStart = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate()
    );

    const analysesLastMonth = allFreeSwingAnalyses.filter(
      (analysis) =>
        analysis.updatedAt >= lastMonthStart &&
        analysis.updatedAt < lastMonthEnd
    );

    const monthlyTotals = [];

    const firstDayOfCurrentMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );

    for (let i = 0; i < 5; i++) {
      const targetMonthStart = new Date(firstDayOfCurrentMonth);
      targetMonthStart.setMonth(targetMonthStart.getMonth() - i);

      const targetMonthEnd = new Date(
        targetMonthStart.getFullYear(),
        targetMonthStart.getMonth() + 1,
        0
      );
      targetMonthEnd.setDate(targetMonthEnd.getDate() + 1);

      const monthYearKey = {
        month: getMonthName(targetMonthStart.getMonth()),
        year: targetMonthStart.getFullYear(),
      };

      const monthlyTotal = {
        month: monthYearKey.month,
        year: monthYearKey.year,
        risk: 0,
        reward: 0,
      };

      const analysesForMonth = allFreeSwingAnalyses.filter(
        (analysis) =>
          analysis.updatedAt >= targetMonthStart &&
          analysis.updatedAt < targetMonthEnd
      );

      analysesForMonth.forEach((analysis) => {
        monthlyTotal.risk += analysis.result.risk;
        const reward = analysis.result.reward;

        const adjustedReward = reward === 0 ? -1 : reward;
        monthlyTotal.reward += adjustedReward;
      });

      monthlyTotals.push(monthlyTotal);
    }

    const reversedMonthlyTotals = monthlyTotals.reverse();

    const lastYearEnd = new Date(currentDate);
    lastYearEnd.setFullYear(currentDate.getFullYear() - 1);
    lastYearEnd.setMonth(11, 31);
    lastYearEnd.setHours(23, 59, 59, 999);

    const lastYearStart = new Date(lastYearEnd);
    lastYearStart.setMonth(0, 1);
    lastYearStart.setHours(0, 0, 0, 0);

    const analysesLastYear = allFreeSwingAnalyses.filter(
      (analysis) =>
        analysis.updatedAt >= lastYearStart && analysis.updatedAt <= lastYearEnd
    );

    const totalRiskLastYear =
      analysesLastYear.reduce(
        (sum, analysis) => sum + analysis.result.risk,
        0
      ) || 0;
    const totalRewardLastYear =
      analysesLastYear.reduce(
        (sum, analysis) => sum + analysis.result.reward,
        0
      ) || 0;

    const totalRiskLastMonth =
      analysesLastMonth.reduce(
        (sum, analysis) => sum + analysis.result.risk,
        0
      ) || 0;

    const totalRewardLastMonth =
      analysesLastMonth.reduce(
        (sum, analysis) => sum + analysis.result.reward,
        0
      ) || 0;

    const totalRisk = allFreeSwingAnalyses.reduce(
      (sum, analysis) => sum + analysis.result.risk,
      0
    );
    // const totalReward = allFreeSwingAnalyses.reduce(
    //   (sum, analysis) => sum + analysis.result.reward,
    //   0
    // );
    const totalReward = allFreeSwingAnalyses.reduce((sum, analysis) => {
      const reward = analysis.result.reward;
      // Set reward to -1 if it is 0
      const adjustedReward = reward === 0 ? -1 : reward;
      return sum + adjustedReward;
    }, 0);

    const lastFiveMonthsTotals = [];

    for (let i = 0; i < 5; i++) {
      const targetMonthStart = new Date(firstDayOfCurrentMonth);
      targetMonthStart.setMonth(targetMonthStart.getMonth() - i);

      const targetMonthEnd = new Date(
        targetMonthStart.getFullYear(),
        targetMonthStart.getMonth() + 1,
        0
      );
      targetMonthEnd.setDate(targetMonthEnd.getDate() + 1);

      const monthYearKey = {
        month: getMonthName(targetMonthStart.getMonth()),
        year: targetMonthStart.getFullYear(),
      };

      const lastFiveMonthsTotal = {
        month: monthYearKey.month,
        year: monthYearKey.year,
        risk: 0,
        reward: 0,
      };

      const analysesForMonth = allFreeSwingAnalyses.filter(
        (analysis) =>
          analysis.updatedAt >= targetMonthStart &&
          analysis.updatedAt < targetMonthEnd
      );

      analysesForMonth.forEach((analysis) => {
        lastFiveMonthsTotal.risk += analysis.result.risk;
        lastFiveMonthsTotal.reward += analysis.result.reward;
      });

      lastFiveMonthsTotals.push(lastFiveMonthsTotal);
    }

    const totalRiskLastFiveMonth = monthlyTotals.reduce(
      (sum, monthTotal) => sum + monthTotal.risk,
      0
    );

    const totalRewardLastFiveMonth = monthlyTotals.reduce(
      (sum, monthTotal) => sum + monthTotal.reward,
      0
    );

    const existingRecord = await SumRiskRewardFreeSwing.findOne();

    if (existingRecord) {
      existingRecord.totalRisk = totalRisk;
      existingRecord.totalReward = totalReward;
      await existingRecord.save();
    } else {
      const sumRiskRewardSwing = new SumRiskRewardFreeSwing({
        totalRisk: totalRisk,
        totalReward: totalReward,
      });
      await sumRiskRewardSwing.save();
    }

    res.status(200).json({
      totalRisk,
      totalReward,
      totalRiskLastMonth,
      totalRewardLastMonth,
      totalRiskLastFiveMonth,
      totalRewardLastFiveMonth,
      reversedMonthlyTotals,
      totalRiskLastYear,
      totalRewardLastYear,
      totalSwingAnalysisCount,
      onlyBreakoutAnalyses,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error - Try after sometime" });
  }
};

module.exports = {
  createFreeSwingAnalysis,
  getAllFreeSwingAnalysis,
  getAllFreeSwingAnalysisUser,
  updateFreeSwingResults,
  sumRiskRewardFreeSwing,
  deleteFreeSwingAnalysis,
};
