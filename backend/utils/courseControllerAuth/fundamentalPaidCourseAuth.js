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
