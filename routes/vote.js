const { Router } = require("express");
const { check } = require("express-validator");

const { votePost, votesGet, voteGet } = require("../controllers/vote");
const { entriesValidator } = require("../middlewares");
const {
  voteIdExists,
  voterIdExists,
  votingIdExists,
} = require("../helpers/db-validator");

const router = Router();

//POST
router.post(
  "/:votingId/:voterId/:option",
  [
    check("votingId", "no valid mongo id").isMongoId(),
    check("votingId").custom(votingIdExists),
    check("voterId", "no valid mongo id").isMongoId(),
    check("voterId").custom(voterIdExists),
    check("option").isNumeric(),
    entriesValidator,
  ],
  votePost
);

//GET
router.get("/", votesGet);

//GET
router.get(
  "/:id",
  [
    check("id", "no valid mongo id").isMongoId(),
    check("id").custom(voteIdExists),
    entriesValidator,
  ],
  voteGet
);

module.exports = router;
