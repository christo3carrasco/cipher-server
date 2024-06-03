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
const { voterIdExists, votingIdExists } = require("../helpers/db-validator");

const router = Router();

//POST
router.post(
  "/",
  [
    check("name", "name is required").not().isEmpty(),
    check("votingProcess", "votingProcess is required").not().isEmpty(),
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
