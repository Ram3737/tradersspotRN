const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.get("Authorization")?.split(" ")[1];

  const breakoutValue = req.query.breakout;
  const rewardValue = req.query.reward;
  const analysisLinkValue = req.query.analysisLink;
  const resultLinkValue = req.query.resultLink;

  console.log("tknnn", token);

  let decodedToken;

  if (token === "null") {
    console.log("check 1");
    if (
      breakoutValue === "null" &&
      rewardValue === "null" &&
      analysisLinkValue === "null" &&
      resultLinkValue === "null"
    ) {
      req.token = token;
      next();
      return;
    }

    if (
      breakoutValue !== "null" &&
      rewardValue === "null" &&
      analysisLinkValue === "null" &&
      resultLinkValue === "null"
    ) {
      res.status(200).json({ totalSwingAnalysis: 0, allSwingAnalyses: [] });
      return;
    }

    if (
      rewardValue !== "null" &&
      breakoutValue === "null" &&
      analysisLinkValue === "null" &&
      resultLinkValue === "null"
    ) {
      req.token = token;

      next();
      return;
    }

    if (
      analysisLinkValue !== "null" &&
      breakoutValue === "null" &&
      rewardValue === "null" &&
      resultLinkValue === "null"
    ) {
      res.status(200).json({ totalSwingAnalysis: 0, allSwingAnalyses: [] });
      return;
    }

    if (
      resultLinkValue !== "null" &&
      breakoutValue === "null" &&
      rewardValue === "null" &&
      analysisLinkValue === "null"
    ) {
      req.token = token;

      next();
      return;
    }
  }

  if (token !== "null") {
    console.log("check 2");
    try {
      decodedToken = jwt.verify(
        token,
        "willbethebestsecretkeyintheworldnouniversenogalaxy"
      );
    } catch (error) {
      error.statusCode = 500;
      throw error;
    }

    if (!decodedToken) {
      const error = new Error("Not Autheticated");
      error.statusCode = 401;
      throw error;
    }

    if (
      decodedToken &&
      decodedToken.courseType === "none" &&
      !decodedToken.paid
    ) {
      if (
        breakoutValue === "null" &&
        rewardValue === "null" &&
        analysisLinkValue === "null" &&
        resultLinkValue === "null"
      ) {
        req.token = "null";
        next();
        return;
      }

      if (
        breakoutValue !== "null" &&
        rewardValue === "null" &&
        analysisLinkValue === "null" &&
        resultLinkValue === "null"
      ) {
        res.status(200).json({ totalSwingAnalysis: 0, allSwingAnalyses: [] });
        return;
      }

      if (
        rewardValue !== "null" &&
        breakoutValue === "null" &&
        analysisLinkValue === "null" &&
        resultLinkValue === "null"
      ) {
        req.token = "null";
        next();
        return;
      }

      if (
        analysisLinkValue !== "null" &&
        breakoutValue === "null" &&
        rewardValue === "null" &&
        resultLinkValue === "null"
      ) {
        res.status(200).json({ totalSwingAnalysis: 0, allSwingAnalyses: [] });
        return;
      }

      if (
        resultLinkValue !== "null" &&
        breakoutValue === "null" &&
        rewardValue === "null" &&
        analysisLinkValue === "null"
      ) {
        req.token = "null";
        next();
        return;
      }
    }

    if (
      decodedToken &&
      decodedToken.courseType === "basic" &&
      !decodedToken.paid
    ) {
      if (
        breakoutValue === "null" &&
        rewardValue === "null" &&
        analysisLinkValue === "null" &&
        resultLinkValue === "null"
      ) {
        req.token = "null";
        next();
        return;
      }

      if (
        breakoutValue !== "null" &&
        rewardValue === "null" &&
        analysisLinkValue === "null" &&
        resultLinkValue === "null"
      ) {
        res.status(200).json({ totalSwingAnalysis: 0, allSwingAnalyses: [] });
        return;
      }

      if (
        rewardValue !== "null" &&
        breakoutValue === "null" &&
        analysisLinkValue === "null" &&
        resultLinkValue === "null"
      ) {
        req.token = "null";
        next();
        return;
      }

      if (
        analysisLinkValue !== "null" &&
        breakoutValue === "null" &&
        rewardValue === "null" &&
        resultLinkValue === "null"
      ) {
        res.status(200).json({ totalSwingAnalysis: 0, allSwingAnalyses: [] });
        return;
      }

      if (
        resultLinkValue !== "null" &&
        breakoutValue === "null" &&
        rewardValue === "null" &&
        analysisLinkValue === "null"
      ) {
        req.token = "null";
        next();
        return;
      }
    }

    if (
      decodedToken &&
      decodedToken.courseType === "basic" &&
      decodedToken.paid
    ) {
      if (
        breakoutValue === "null" &&
        rewardValue === "null" &&
        analysisLinkValue === "null" &&
        resultLinkValue === "null"
      ) {
        req.token = "null";
        next();
        return;
      }

      if (
        breakoutValue !== "null" &&
        rewardValue === "null" &&
        analysisLinkValue === "null" &&
        resultLinkValue === "null"
      ) {
        res.status(200).json({ totalSwingAnalysis: 0, allSwingAnalyses: [] });
        return;
      }

      if (
        rewardValue !== "null" &&
        breakoutValue === "null" &&
        analysisLinkValue === "null" &&
        resultLinkValue === "null"
      ) {
        req.token = "null";
        next();
        return;
      }

      if (
        analysisLinkValue !== "null" &&
        breakoutValue === "null" &&
        rewardValue === "null" &&
        resultLinkValue === "null"
      ) {
        res.status(200).json({ totalSwingAnalysis: 0, allSwingAnalyses: [] });
        return;
      }

      if (
        resultLinkValue !== "null" &&
        breakoutValue === "null" &&
        rewardValue === "null" &&
        analysisLinkValue === "null"
      ) {
        req.token = "null";
        next();
        return;
      }
    }

    if (
      decodedToken &&
      (decodedToken.courseType === "standard" ||
        decodedToken.courseType === "pro") &&
      !decodedToken.paid
    ) {
      if (
        breakoutValue === "null" &&
        rewardValue === "null" &&
        analysisLinkValue === "null" &&
        resultLinkValue === "null"
      ) {
        req.token = "null";
        next();
        return;
      }

      if (
        breakoutValue !== "null" &&
        rewardValue === "null" &&
        analysisLinkValue === "null" &&
        resultLinkValue === "null"
      ) {
        res.status(200).json({ totalSwingAnalysis: 0, allSwingAnalyses: [] });
        return;
      }

      if (
        rewardValue !== "null" &&
        breakoutValue === "null" &&
        analysisLinkValue === "null" &&
        resultLinkValue === "null"
      ) {
        req.token = "null";
        next();
        return;
      }

      if (
        analysisLinkValue !== "null" &&
        breakoutValue === "null" &&
        rewardValue === "null" &&
        resultLinkValue === "null"
      ) {
        res.status(200).json({ totalSwingAnalysis: 0, allSwingAnalyses: [] });
        return;
      }

      if (
        resultLinkValue !== "null" &&
        breakoutValue === "null" &&
        rewardValue === "null" &&
        analysisLinkValue === "null"
      ) {
        req.token = "null";
        next();
        return;
      }
    }

    if (
      decodedToken &&
      (decodedToken.courseType === "standard" ||
        decodedToken.courseType === "pro") &&
      decodedToken.paid
    ) {
      req.token = token;
      next();
      return;
    }
  }
};
