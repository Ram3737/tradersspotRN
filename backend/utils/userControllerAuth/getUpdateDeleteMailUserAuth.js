const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.get("Authorization")?.split(" ")[1];

  let decodedToken;
  console.log("here delete");
  try {
    decodedToken = jwt.verify(
      token,
      "willbethebestsecretkeyintheworldnouniversenogalaxy"
    );
  } catch (error) {
    error.statusCode = 500;
    throw error;
  }

  if (!decodedToken || decodedToken?.userType !== "admin") {
    const error = new Error("Not Autheticated");
    error.statusCode = 401;
    throw error;
  }

  next();
};
