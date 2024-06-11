const { Router } = require("express");
const { check } = require("express-validator");

const {
  votingPost,
  votingsGet,
  votingGet,
  votingPut,
  votingDelete,
} = require("../controllers/voting");
const { entriesValidator } = require("../middlewares");
const { votingIdExists, userIdExists } = require("../helpers/db-validator");

const router = Router();

//POST
router.post(
  "/",
  [
    check("title", "title is required").notEmpty(),
    check("description", "description is required").notEmpty(),
    check("startDate", "startDate is required").notEmpty(),
    check("endDate", "endDate is required").notEmpty(),
    check("contractAddress", "contractAddress is required").isEthereumAddress(),
    check("organizer", "organizer is required").isMongoId(),
    check("organizer").custom(userIdExists),
    entriesValidator,
  ],
  votingPost
);

//GET
router.get("/", votingsGet);

//GET
router.get(
  "/:id",
  [
    check("id", "no valid mongo id").isMongoId(),
    check("id").custom(votingIdExists),
    entriesValidator,
  ],
  votingGet
);

//PUT
router.put(
  "/:id",
  [
    check("id", "no valid mongo id").isMongoId(),
    check("id").custom(votingIdExists),
    entriesValidator,
  ],
  votingPut
);

//DELETE
router.delete(
  "/:id",
  [
    check("id", "no valid mongo id").isMongoId(),
    check("id").custom(votingIdExists),
    entriesValidator,
  ],
  votingDelete
);

module.exports = router;
