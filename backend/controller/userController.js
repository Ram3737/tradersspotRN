const User = require("../model/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");

const createUser = async (req, res) => {
  try {
    const { name, email, mobileNumber, password, courseType, triedToUpdate } =
      req.body;
    const userType = "learner";
    const paid = false;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      name,
      email,
      mobileNumber,
      password: hashedPassword,
      userType,
      courseType,
      paid,
      triedToUpdate,
      // resetPasswordOTP: {
      //   code: null,
      //   expiresAt: null,
      // },
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
      name: user.name,
      email: user.email,
      mobileNumber: user.mobileNumber,
      userType: user.userType,
      courseType: user.courseType,
      paid: user.paid,
      token: token,
      triedToUpdate: user.triedToUpdate,
    });
  } catch (error) {
    console.error("signin error", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const page = req.query.page; // Get the page from the query parameters
    const limit = req.query.limit || 10;
    const search = req.query.search || null;

    const skip = (page - 1) * limit;

    const courseTypeValue = req.query.courseType;
    const ttuValue = req.query.ttu;
    const paidValue = req.query.paid;

    let query = [];

    if (courseTypeValue && courseTypeValue !== "null") {
      const courseTypeValues = courseTypeValue.split(",");
      query.push({ courseType: { $in: courseTypeValues } });
    }

    if (paidValue && paidValue !== "null") {
      query.push({ paid: paidValue });
    }

    if (ttuValue && ttuValue !== "null") {
      query.push({ triedToUpdate: ttuValue });
    }

    console.log("ct", courseTypeValue);
    console.log("pv", paidValue);

    console.log("user", query);

    if (search) {
      const users = await User.find(
        { email: { $regex: new RegExp(search, "i") } },
        "_id email courseType paid userType triedToUpdate"
      )
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

      const totalUsers = await User.countDocuments({
        email: { $regex: new RegExp(search, "i") },
      });

      res.status(200).json({ users, totalUsers });
    } else {
      const users = await User.find(
        query.length > 0 ? { $and: query } : {},
        "_id email courseType paid userType triedToUpdate"
      )
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

      const totalUsers = await User.countDocuments(
        query.length > 0 ? { $and: query } : {}
      );

      res.status(200).json({ users, totalUsers });
    }
  } catch (error) {
    console.error("getAllUsers", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getUserByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      name: user.name,
      email: user.email,
      mobileNumber: user.mobileNumber,
      userType: user.userType,
      courseType: user.courseType,
      paid: user.paid,
      triedToUpdate: user.triedToUpdate,
    });
  } catch (error) {
    console.error("getUserByEmail error", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Route to get user details by email
app.get("/user/:email", getUserByEmail);

const buyCourse = async (req, res) => {
  try {
    const { email, courseType, triedToUpdate } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.courseType = courseType;
    user.triedToUpdate = triedToUpdate;
    // user.paid = true;

    await user.save();

    res.status(201).json({
      courseType: courseType,
      triedToUpdate: triedToUpdate,
    });
  } catch (error) {
    res.status(404).json({ message: "Server Error - Try after sometime" });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id: userId } = req.params;
    // const { courseType, paid, triedToUpdate } = req.body;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(404).send({ error: "User not found!" });
    }

    const user = await User.findByIdAndUpdate(userId, req.body);

    await user.save();

    res.status(201).json({
      message: "user Updated",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error - Try after sometime" });
  }
};

const checkUserPassword = async (req, res) => {
  try {
    const { email, enteredPassword } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordMatch = await bcrypt.compare(
      enteredPassword,
      user.password
    );

    if (!isPasswordMatch) {
      return res
        .status(401)
        .json({ message: "Entered password does not match" });
    }

    res.status(200).json({ message: "Password is correct" });
  } catch (error) {
    console.error("checkUserPassword", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;

    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error("resetPassword", error.message);
    res
      .status(500)
      .json({ message: "Internal server error, Try after sometime" });
  }
};

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const transporter = nodemailer.createTransport({
  service: "gmail", // use your email service provider
  auth: {
    user: "tradersspot.in@gmail.com", // replace with your email
    pass: "mywu lutg khan bwil", // replace with your email password
  },
});

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Email not found" });
    }

    const otp = generateOTP();

    // Save OTP and timestamp in temporary storage
    user.resetPasswordOTP = {
      code: otp,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000),
    };

    await user.save();

    // Send OTP to user's email
    const mailOptions = {
      from: "tradersspot.in@gmail.com", // replace with your email
      to: user.email,
      subject: "Password Reset OTP",
      text: `Your OTP for password reset is: ${otp}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("forgotPassword", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

const verifyOTP = async (req, res) => {
  try {
    const { email, enteredOTP } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { resetPasswordOTP } = user;

    if (!resetPasswordOTP || resetPasswordOTP.expiresAt < Date.now()) {
      return res
        .status(400)
        .json({ message: "OTP expired, Try after sometime..." });
    }
    if (resetPasswordOTP.code !== enteredOTP) {
      return res.status(401).json({ message: "Invalid OTP" });
    }

    // Clear the OTP after successful verification
    user.resetPasswordOTP = undefined;

    await user.save();

    res.status(200).json({ message: "OTP verified successfully" });
  } catch (error) {
    console.error("verifyOTP", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

const PurchaseConfirmationEmail = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Email not found" });
    }

    const mailOptions = {
      from: "tradersspot.in@gmail.com",
      to: email,
      subject: "Purchase confirmation mail",
      html: `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Template</title>
      </head>
      <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
      
        <div style="max-width:'100%'; margin: 20px auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
      

      
          <h2 style="color: #333333;">Trader's spot</h2>
      
          <p style="color: #666666;">Thank you for purchasing our course. You can now access our courses anywhere, anytime through our mobile and web app.</p>
      
          <p class="price" style="color: #0c969a; font-weight: bold;">Happy Trading</p>
      
        </div>
      
      </body>
      </html>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Mail sent" });
  } catch (error) {
    console.error("forgotPassword", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id: userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(404).send({ error: "User not found!" });
    }

    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("deleteUser", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createUser,
  signInUser,
  getAllUsers,
  getUserByEmail,
  buyCourse,
  updateUser,
  checkUserPassword,
  resetPassword,
  forgotPassword,
  verifyOTP,
  PurchaseConfirmationEmail,
  deleteUser,
};
