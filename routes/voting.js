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
const { votingIdExists } = require("../helpers/db-validator");

const router = Router();

//POST
router.post(
  "/",
  [
    check("title", "title is required").not().isEmpty(),
    check("description", "description is required").not().isEmpty(),
    check("startDate", "startDate is required").not().isEmpty(),
    check("endDate", "endDate is required").not().isEmpty(),
    check("contractAddress", "contractAddress is required").not().isEmpty(),
    check("password", "password is required").not().isEmpty(),
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
