const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const userController = require("../controller/userController");

router.post(
  "/signup",
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

router.post("/signin", userController.signInUser);
router.get("/getAllUsers", userController.getAllUsers);
router.patch("/buyCourse", userController.buyCourse);
router.patch("/updateUser/:id", userController.updateUser);
router.post("/checkPassword", userController.checkUserPassword);
router.post("/resetPassword", userController.resetPassword);
module.exports = router;
