const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const userController = require("../controller/userController");

router.post(
  "/create-user",
  // [
  //   check("email", "Invalid email address").isEmail(),
  //   check(
  //     "password",
  //     "Password must be at least 6 characters, and include at least one special character and one number"
  //   )
  //     .isLength({ min: 6 })
  //     .matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]$/),
  //   check("mobileNumber", "Invalid mobile number").isMobilePhone("any", {
  //     strictMode: false,
  //   }),
  // ],
  // async (req, res) => {
  //   const errors = validationResult(req);
  //   if (!errors.isEmpty()) {
  //     return res.status(400).json({ errors: errors.array() });
  //   }
  userController.createUser
  // }
);

router.post("/signin-user", userController.signInUser);
router.get("/get-all-users", userController.getAllUsers);
router.patch("/buy-course", userController.buyCourse);
router.patch("/update-user/:id", userController.updateUser);
router.post("/check-user-password", userController.checkUserPassword);
router.post("/reset-password", userController.resetPassword);
router.post("/forgot-password", userController.forgotPassword);
router.post("/verify-otp", userController.verifyOTP);
router.post(
  "/purchase-confirmation-email",
  userController.PurchaseConfirmationEmail
);
router.delete("/delete-user/:id", userController.deleteUser);
module.exports = router;
