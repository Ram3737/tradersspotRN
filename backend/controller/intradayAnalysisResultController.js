const IntradayAnalysisResult = require("../model/intradayAnalysisModel");
const SumRiskRewardIntraday = require("../model/sumRiskRewardIntradayModel");
const mongoose = require("mongoose");

const createIntradayAnalysis = async (req, res) => {
  try {
    const { analysis, result } = req.body;
    const newIntradayAnalysisResult = new IntradayAnalysisResult({
      analysis: {
        stockName: analysis.stockName,
        pattern: analysis.pattern,
        analysisLink: analysis.analysisLink,
      },
      result: {
        risk: result.risk,
        reward: result.reward,
        resultLink: result.resultLink,
      },
    });

    const savedIntradayAnalysisResult = await newIntradayAnalysisResult.save();

    res.status(201).json({ message: "analysis created" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllIntradayAnalysis = async (req, res) => {
  try {
    const page = req.query.page;
    const allIntradayAnalyses = await IntradayAnalysisResult.find()
      .sort({ createdAt: -1 })
      .limit(page);
    res.status(200).json(allIntradayAnalyses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateIntradayResults = async (req, res) => {
  try {
    const { id: userId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(404).send({ error: "Analysis not found!" });
    }

    const analysis = await IntradayAnalysisResult.findByIdAndUpdate(
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

function getMonthName(monthIndex) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return months[monthIndex];
}

const getDayAsString = (date) => {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return daysOfWeek[date.getDay()];
};

const sumRiskRewardIntraday = async (req, res) => {
  try {
    const allIntradayAnalyses = await IntradayAnalysisResult.find();
    const totalIntradayAnalysisCount =
      await IntradayAnalysisResult.countDocuments();

    if (!allIntradayAnalyses || allIntradayAnalyses.length === 0) {
      throw new Error("No analyses found to calculate sum");
    }

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

    const lastDayEnd = new Date(currentDate);
    lastDayEnd.setDate(currentDate.getDate() - 1);
    lastDayEnd.setHours(23, 59, 59, 999);

    const lastDayStart = new Date(lastDayEnd);
    lastDayStart.setHours(0, 0, 0, 0);

    const analysesThisWeek = allIntradayAnalyses.filter(
      (analysis) =>
        analysis.updatedAt >= currentWeekStart &&
        analysis.updatedAt <= currentWeekEnd
    );

    const analysesLastMonth = allIntradayAnalyses.filter(
      (analysis) =>
        analysis.updatedAt >= lastMonthStart &&
        analysis.updatedAt < lastMonthEnd
    );

    const analysesToday = allIntradayAnalyses.filter(
      (analysis) =>
        analysis.updatedAt >= currentDayStart &&
        analysis.updatedAt <= currentDate
    );

    const monthlyTotals = {};

    allIntradayAnalyses.forEach((analysis) => {
      const currentYear = analysis.updatedAt.getFullYear();
      const monthYearKey = `${getMonthName(
        analysis.updatedAt.getMonth()
      )}_${currentYear}`;

      if (!monthlyTotals[monthYearKey]) {
        monthlyTotals[monthYearKey] = { risk: 0, reward: 0 };
      }

      monthlyTotals[monthYearKey].risk += analysis.result.risk;
      monthlyTotals[monthYearKey].reward += analysis.result.reward;
    });

    // Optional: You can iterate over the monthlyTotals object if needed
    for (const key in monthlyTotals) {
      if (Object.hasOwnProperty.call(monthlyTotals, key)) {
        const { risk, reward } = monthlyTotals[key];
        console.log(`${key}: Risk - ${risk}, Reward - ${reward}`);
      }
    }

    const lastYearEnd = new Date(currentDate);
    lastYearEnd.setFullYear(currentDate.getFullYear() - 1);
    lastYearEnd.setMonth(11, 31);
    lastYearEnd.setHours(23, 59, 59, 999);

    const lastYearStart = new Date(lastYearEnd);
    lastYearStart.setMonth(0, 1);
    lastYearStart.setHours(0, 0, 0, 0);

    const analysesLastYear = allIntradayAnalyses.filter(
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

    const yesterdayAnalyses = allIntradayAnalyses.filter(
      (analysis) =>
        analysis.updatedAt >= lastDayStart && analysis.updatedAt <= lastDayEnd
    );

    const totalRiskYesterday =
      yesterdayAnalyses.reduce(
        (sum, analysis) => sum + analysis.result.risk,
        0
      ) || 0;
    const totalRewardYesterday =
      yesterdayAnalyses.reduce(
        (sum, analysis) => sum + analysis.result.reward,
        0
      ) || 0;

    const totalRiskThisWeek =
      analysesThisWeek.reduce(
        (sum, analysis) => sum + analysis.result.risk,
        0
      ) || 0;
    const totalRewardThisWeek =
      analysesThisWeek.reduce(
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

    const totalRiskToday =
      analysesToday.reduce((sum, analysis) => sum + analysis.result.risk, 0) ||
      0;

    const totalRewardToday =
      analysesToday.reduce(
        (sum, analysis) => sum + analysis.result.reward,
        0
      ) || 0;

    const totalRisk = allIntradayAnalyses.reduce(
      (sum, analysis) => sum + analysis.result.risk,
      0
    );

    const totalReward = allIntradayAnalyses.reduce(
      (sum, analysis) => sum + analysis.result.reward,
      0
    );

    const lastFiveDaysData = {};
    let currentDatePointer = new Date(currentDate);

    while (Object.keys(lastFiveDaysData).length < 5) {
      currentDatePointer.setDate(currentDatePointer.getDate() - 1);

      // Exclude weekends (Saturday and Sunday)
      if (
        currentDatePointer.getDay() !== 0 &&
        currentDatePointer.getDay() !== 6
      ) {
        const dayAsString = getDayAsString(currentDatePointer).substring(0, 3);

        if (!lastFiveDaysData[dayAsString]) {
          lastFiveDaysData[dayAsString] = { risk: 0, reward: 0 };
        }

        const analysesOnCurrentDay = allIntradayAnalyses.filter(
          (analysis) =>
            analysis.updatedAt.toDateString() ===
            currentDatePointer.toDateString()
        );

        analysesOnCurrentDay.forEach((analysis) => {
          lastFiveDaysData[dayAsString].risk += analysis.result.risk;
          lastFiveDaysData[dayAsString].reward += analysis.result.reward;
        });
      }
    }

    const totalRiskLastFiveDays = Object.values(lastFiveDaysData).reduce(
      (sum, dayData) => sum + dayData.risk,
      0
    );

    const totalRewardLastFiveDays = Object.values(lastFiveDaysData).reduce(
      (sum, dayData) => sum + dayData.reward,
      0
    );

    const existingRecord = await SumRiskRewardIntraday.findOne();

    if (existingRecord) {
      existingRecord.totalRisk = totalRisk;
      existingRecord.totalReward = totalReward;
      await existingRecord.save();
    } else {
      const sumRiskRewardIntraday = new SumRiskRewardIntraday({
        totalRisk: totalRisk,
        totalReward: totalReward,
      });
      await sumRiskRewardIntraday.save();
    }

    res.status(200).json({
      totalRisk,
      totalReward,
      totalRiskLastMonth,
      totalRewardLastMonth,
      totalRiskThisWeek,
      totalRewardThisWeek,
      totalRiskYesterday,
      totalRewardYesterday,
      totalRiskToday,
      totalRewardToday,
      monthlyTotals,
      totalRiskLastYear,
      totalRewardLastYear,
      totalIntradayAnalysisCount,
      lastFiveDaysData,
      totalRiskLastFiveDays,
      totalRewardLastFiveDays,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error - Try after sometime" });
  }
};

module.exports = {
  createIntradayAnalysis,
  getAllIntradayAnalysis,
  updateIntradayResults,
  sumRiskRewardIntraday,
};
