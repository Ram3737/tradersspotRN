const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const userController = require("../controller/userController");
const isAuth = require("../utils/isAuth");
const getUpdateDeleteMailUserAuth = require("../utils/userControllerAuth/getUpdateDeleteMailUserAuth");
const basicUserAuth = require("../utils/userControllerAuth/basicUserAuth");

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
router.post("/signin-user-web", userController.signInUserWeb);
router.get(
  "/get-all-users",
  getUpdateDeleteMailUserAuth,
  userController.getAllUsers
);
router.patch("/buy-course", basicUserAuth, userController.buyCourse);
router.patch(
  "/update-user/:id",
  getUpdateDeleteMailUserAuth,
  userController.updateUser
);
router.post(
  "/check-user-password",
  basicUserAuth,
  userController.checkUserPassword
);
router.post(
  "/reset-password-profile",
  basicUserAuth,
  userController.resetPasswordProfile
);
router.post("/reset-password", userController.resetPassword);
router.post("/forgot-password", userController.forgotPassword);
router.post("/verify-otp", userController.verifyOTP);
router.post(
  "/purchase-confirmation-email",
  getUpdateDeleteMailUserAuth,
  userController.PurchaseConfirmationEmail
);
router.delete(
  "/delete-user/:id",
  getUpdateDeleteMailUserAuth,
  userController.deleteUser
);
router.get("/delete-user-for", userController.deleteUserForGPlay);
router.post("/new-registration-otp", userController.newUserRegistrationOTP);
router.post("/verify-token", userController.verifyToken);
module.exports = router;
