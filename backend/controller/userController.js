const User = require("../model/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
  try {
    const { email, mobileNumber, password, courseType } = req.body;
    const userType = "learner";
    const paid = null;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      email,
      mobileNumber,
      password: hashedPassword,
      userType,
      courseType,
      paid,
    });

    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("signup", error.message);
    if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
      res.status(400).json({ message: "Email already in use" });
    } else if (
      error.code === 11000 &&
      error.keyPattern &&
      error.keyPattern.mobileNumber
    ) {
      res.status(400).json({ message: "Mobile number already in use" });
    } else {
      // Other errors
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

const signInUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      {
        email: user.email,
        userType: user.userType,
      },
      "willbethebestsecretkeyintheworldnouniversenogalaxy", // Replace with your secret key
      { expiresIn: "1h" } // Set the expiration time of the token
    );

    res.status(200).json({
      email: user.email,
      userType: user.userType,
      courseType: user.courseType,
      paid: user.paid,
      token: token,
    });
  } catch (error) {}
};

const buyCourse = async (req, res) => {
  try {
    const { email, courseType } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.courseType = courseType;
    // user.paid = true;

    await user.save();

    res.status(201).json({
      courseType: courseType,
    });
  } catch (error) {
    res.status(404).json({ message: "Server Error - Try after sometime" });
  }
};

module.exports = {
  createUser,
  signInUser,
  buyCourse,
};
