const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.get("Authorization")?.split(" ")[1];

  const startContent = [
    {
      name: "Importance of Fundamental and Technical Analysis",
      link: ``,
      duration: `09:19 mins`,
      pointOne: ``,
      pointTwo: ``,
      pointThree: ``,
    },
    {
      name: "Learn to generate wealth using basic fundamental analysis concepts",
      link: ``,
      duration: `07:12 mins`,
      pointOne: ``,
      pointTwo: ``,
      pointThree: ``,
    },
    {
      name: "Does Investment Work with Fundamental Analysis",
      link: ``,
      duration: `08:03 mins`,
      pointOne: ``,
      pointTwo: ``,
      pointThree: ``,
    },
    {
      name: "Categories of fundamental analysis",
      link: ``,
      duration: `08:22 mins`,
      pointOne: ``,
      pointTwo: ``,
      pointThree: ``,
    },
    {
      name: "What is qualitative analysis ?",
      link: ``,
      duration: `17:36 mins`,
      pointOne: ``,
      pointTwo: ``,
      pointThree: ``,
    },
    {
      name: "How do I evaluate stocks using qualitative analysis ?",
      link: ``,
      duration: `05:35 mins`,
      pointOne: ``,
      pointTwo: ``,
      pointThree: ``,
    },
  ];

  const coreContent = [
    {
      name: "Major key ratio in fundamental analysis",
      link: ``,
      duration: `06:16 mins`,
      pointOne: ``,
      pointTwo: ``,
      pointThree: ``,
    },
    {
      name: "6 important key ratio",
      link: ``,
      duration: `03:13 mins`,
      pointOne: ``,
      pointTwo: ``,
      pointThree: ``,
    },
    {
      name: "What is stock pe and why pe is important ?",
      link: ``,
      duration: `05:15 mins`,
      pointOne: ``,
      pointTwo: ``,
      pointThree: ``,
    },
    {
      name: "How to calculate PE ratio ?",
      link: ``,
      duration: `12:29 mins`,
      pointOne: ``,
      pointTwo: ``,
      pointThree: ``,
    },
    {
      name: "What is book value and why book value is important ?",
      link: ``,
      duration: `09:30 mins`,
      pointOne: ``,
      pointTwo: ``,
      pointThree: ``,
    },
    {
      name: "How to calculate book value ?",
      link: ``,
      duration: `09:18 mins`,
      pointOne: ``,
      pointTwo: ``,
      pointThree: ``,
    },
    {
      name: "What is dividend ?",
      link: ``,
      duration: `08:17 mins`,
      pointOne: ``,
      pointTwo: ``,
      pointThree: ``,
    },
    {
      name: "How to calculate dividend yield ?",
      link: ``,
      duration: `04:41 mins`,
      pointOne: ``,
      pointTwo: ``,
      pointThree: ``,
    },
    {
      name: "What is Return-on-Equity ?",
      link: ``,
      duration: `05:43 mins`,
      pointOne: ``,
      pointTwo: ``,
      pointThree: ``,
    },
    {
      name: "How Return on equity is calculated ?",
      link: ``,
      duration: `05:09 mins`,
      pointOne: ``,
      pointTwo: ``,
      pointThree: ``,
    },
    {
      name: "What is Roce ?",
      link: ``,
      duration: `03:25 mins`,
      pointOne: ``,
      pointTwo: ``,
      pointThree: ``,
    },
    {
      name: "How to calculate Roce ?",
      link: ``,
      duration: `05:13 mins`,
      pointOne: ``,
      pointTwo: ``,
      pointThree: ``,
    },
    {
      name: "What is Debt-to-Equity Ratio ?",
      link: ``,
      duration: `03:21 mins`,
      pointOne: ``,
      pointTwo: ``,
      pointThree: ``,
    },
    {
      name: "How to do Debt-To-Equity Ratio calculation ?",
      link: ``,
      duration: `05:14 mins`,
      pointOne: ``,
      pointTwo: ``,
      pointThree: ``,
    },
  ];

  let decodedToken;

  try {
    decodedToken = jwt.verify(
      token,
      "willbethebestsecretkeyintheworldnouniversenogalaxy"
    );
  } catch (error) {
    error.statusCode = 500;
    throw error;
  }

  if (!decodedToken || decodedToken?.userType !== "learner") {
    const error = new Error("Not Autheticated");
    error.statusCode = 401;
    throw error;
  }

  if (decodedToken?.courseType === "none") {
    const error = new Error("Not Autheticated");
    error.statusCode = 401;
    throw error;
  }

  if (
    decodedToken?.courseType === "basic" ||
    decodedToken?.courseType === "standard"
  ) {
    res.status(200).json({
      startContent,
      coreContent,
    });
    return;
  }

  next();
};
