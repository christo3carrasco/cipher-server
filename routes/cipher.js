const { Router } = require("express");
const { cipherGet, cipherPost, cipherPut } = require("../controllers/cipher");

const router = Router();

//GET
router.get("/:address", cipherGet);

//POST
router.post("/:address", cipherPost);

//PUT
router.put("/:address/:id", cipherPut);

module.exports = router;
