const { Router } = require("express");
const { votePut } = require("../controllers/vote");

const router = Router();

//PUT
router.put("/:address/:id", votePut);

module.exports = router;
