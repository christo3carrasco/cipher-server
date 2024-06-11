const { Router } = require("express");
const { check } = require("express-validator");

const {
  voterPost,
  votersGet,
  voterGet,
  voterPut,
  voterDelete,
} = require("../controllers/voter");
const { entriesValidator } = require("../middlewares");
const {
  voterIdExists,
  votingIdExists,
  userIdExists,
} = require("../helpers/db-validator");

const router = Router();

//POST
router.post(
  "/",
  [
    check("user", "user is required").notEmpty(),
    check("user", "no valid mongo id").isMongoId(),
    check("user").custom(userIdExists),
    check("votingProcess", "votingProcess is required").notEmpty(),
    check("votingProcess", "no valid mongo id").isMongoId(),
    check("votingProcess").custom(votingIdExists),
    entriesValidator,
  ],
  voterPost
);

//GET
router.get("/", votersGet);

//GET
router.get(
  "/:id",
  [
    check("id", "no valid mongo id").isMongoId(),
    check("id").custom(voterIdExists),
    entriesValidator,
  ],
  voterGet
);

//PUT
router.put(
  "/:id",
  [
    check("id", "no valid mongo id").isMongoId(),
    check("id").custom(voterIdExists),
    entriesValidator,
  ],
  voterPut
);

//DELETE
router.delete(
  "/:id",
  [
    check("id", "no valid mongo id").isMongoId(),
    check("id").custom(voterIdExists),
    entriesValidator,
  ],
  voterDelete
);

module.exports = router;
