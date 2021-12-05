const router = require("express").Router();
const { consultaDetalleItem } = require("../controllers/item.controller");

router.get("/:id", consultaDetalleItem);

module.exports = router;
