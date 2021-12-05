const router = require("express").Router();
const { consultaItems } = require("../controllers/items.controller");

router.get("/",  consultaItems);

module.exports = router;
