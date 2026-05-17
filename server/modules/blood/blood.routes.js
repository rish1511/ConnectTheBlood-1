const express = require("express");
const { bloodController } = require("./blood.controller");

const router = express.Router();
router.get("/search", bloodController.search);

module.exports = router;
