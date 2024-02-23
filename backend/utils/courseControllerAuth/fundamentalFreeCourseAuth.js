const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.get("Authorization")?.split(" ")[1];

  const startContent = [
    {
      name: "Introduction to the Market",
      link: ``,
      duration: `17:00 mins`,
      pointOne: ``,
      pointTwo: ``,
      pointThree: ``,
    },
  ];

  const coreContent = [
    {
      name: "To the Market",
      link: ``,
      duration: `17:00 mins`,
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
      const error = new Error("Not Autheticated");
      error.statusCode = 401;
      throw error;
    }
  }

  next();
};
