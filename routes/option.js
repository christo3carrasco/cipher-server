const { Router } = require("express");
const { check } = require("express-validator");

const { optionGet, optionPost } = require("../controllers/option");
const { entriesValidator } = require("../middlewares");
const { votingIdExists } = require("../helpers/db-validator");

const router = Router();

//GET
router.get(
  "/:id",
  [
    check("id", "no valid mongo id").isMongoId(),
    check("id").custom(votingIdExists),
    entriesValidator,
  ],
  optionGet
);

//POST
router.post(
  "/:id",
  [
    check("id", "no valid mongo id").isMongoId(),
    check("id").custom(votingIdExists),
    check("name", "name is required").not().isEmpty(),
    entriesValidator,
  ],
  optionPost
);

module.exports = router;
