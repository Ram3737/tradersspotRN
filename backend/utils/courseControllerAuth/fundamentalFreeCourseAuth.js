const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.get("Authorization")?.split(" ")[1];

  const startContent = [
    {
      name: "Introduction to the Market - 1",
      link: ``,
      duration: `17:00 mins`,
      pointOne: ``,
      pointTwo: ``,
      pointThree: ``,
    },
    {
      name: "Introduction to the Market - 2",
      link: ``,
      duration: `16:32 mins`,
      pointOne: ``,
      pointTwo: ``,
      pointThree: ``,
    },
    {
      name: "The untold story of  the Stock Market in India",
      link: ``,
      duration: `01:38 mins`,
      pointOne: ``,
      pointTwo: ``,
      pointThree: ``,
    },
    {
      name: "How indian stock market works ?",
      link: ``,
      duration: `05:55 mins`,
      pointOne: ``,
      pointTwo: ``,
      pointThree: ``,
    },
    {
      name: "The inside market series",
      link: ``,
      duration: `01:19 mins`,
      pointOne: ``,
      pointTwo: ``,
      pointThree: ``,
    },
  ];

  const coreContent = [
    {
      name: "Why do companies get listed on the stock market ?",
      link: ``,
      duration: `10:00 mins`,
      pointOne: ``,
      pointTwo: ``,
      pointThree: ``,
    },
    {
      name: "What is primary market & secondary market ?",
      link: ``,
      duration: `04:11 mins`,
      pointOne: ``,
      pointTwo: ``,
      pointThree: ``,
    },
    {
      name: "What is NSE & BSE ?",
      link: ``,
      duration: `04:53 mins`,
      pointOne: ``,
      pointTwo: ``,
      pointThree: ``,
    },
    {
      name: "Types of investors in stock market",
      link: ``,
      duration: `07:01 mins`,
      pointOne: ``,
      pointTwo: ``,
      pointThree: ``,
    },
    {
      name: "Don't be IGF",
      link: ``,
      duration: `07:01 mins`,
      pointOne: ``,
      pointTwo: ``,
      pointThree: ``,
    },
    {
      name: "How to analyze stocks like a pro ?",
      link: ``,
      duration: `10:35 mins`,
      pointOne: ``,
      pointTwo: ``,
      pointThree: ``,
    },
    {
      name: "Trading vs Investment",
      link: ``,
      duration: `06:57 mins`,
      pointOne: ``,
      pointTwo: ``,
      pointThree: ``,
    },
    {
      name: "What is Demat and Trading Account ?",
      link: ``,
      duration: `06:35 mins`,
      pointOne: ``,
      pointTwo: ``,
      pointThree: ``,
    },
    {
      name: "Mandatory tools for every stock market investor",
      link: ``,
      duration: `05:39 mins`,
      pointOne: ``,
      pointTwo: ``,
      pointThree: ``,
    },
  ];

  if (token === "null") {
    res.status(200).json({
      startContent,
      coreContent,
    });
    return;
  }
  let decodedToken;
  if (token) {
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
      res.status(200).json({
        startContent,
        coreContent,
      });
      return;
    }
  }

  next();
};
