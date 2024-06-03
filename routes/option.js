const { Router } = require("express");
const { optionGet, optionPost } = require("../controllers/option");

const router = Router();

//GET
router.get("/:address", optionGet);

//POST
router.post("/:address", optionPost);

module.exports = router;
