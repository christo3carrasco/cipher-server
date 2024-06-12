const { Router } = require("express");
const { check } = require("express-validator");

const {
  userPost,
  usersGet,
  userGet,
  userPut,
  userDelete,
} = require("../controllers/user");

const {
  entriesValidator,
  hasValidJwt,
  hasAdmin,
  hasRole,
} = require("../middlewares");

const {
  emailExists,
  roleExists,
  userIdExists,
} = require("../helpers/db-validator");

const router = Router();

//POST
router.post(
  "/",
  [
    check("name", "name is required").notEmpty(),
    check("email", "email is required").isEmail(),
    check("email").custom(emailExists),
    check("password", "password too short").isLength({ min: 6 }),
    check("phone", "phone is required").isMobilePhone(),
    check("dateOfBirth", "dateOfBirth is required").isDate(),
    check("rol").custom(roleExists),
    entriesValidator,
  ],
  userPost
);

//GET
router.get("/", usersGet);

//GET
router.get(
  "/:id",
  [
    check("id", "no valid mongo id").isMongoId(),
    check("id").custom(userIdExists),
    entriesValidator,
  ],
  userGet
);

//PUT
router.put(
  "/:id",
  [
    hasValidJwt,
    hasRole("ADMIN_ROLE", "USER_ROLE"),
    check("id", "no valid mongo id").isMongoId(),
    check("id").custom(userIdExists),
    entriesValidator,
  ],
  userPut
);

//DELETE
router.delete(
  "/:id",
  [
    hasValidJwt,
    hasAdmin,
    check("id", "no valid mongo id").isMongoId(),
    check("id").custom(userIdExists),
    entriesValidator,
  ],
  userDelete
);

module.exports = router;
