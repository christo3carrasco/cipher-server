const { Router } = require("express");
const { check } = require("express-validator");
const { login } = require("../controllers/auth");
const { entriesValidator } = require("../middlewares");

const router = Router();

//POST
router.post(
  "/login",
  [
    check("email", "email is required").isEmail(),
    check("password", "password too short").notEmpty(),
    entriesValidator,
  ],
  login
);

module.exports = router;
