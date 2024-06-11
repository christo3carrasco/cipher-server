const entriesValidator = require("../middlewares/entries-validator");
const jwtValidator = require("../middlewares/jwt-validator");
const roleValidator = require("../middlewares/role-validator");

module.exports = {
  ...entriesValidator,
  ...jwtValidator,
  ...roleValidator,
};
