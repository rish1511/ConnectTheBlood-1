const express = require("express");
const { bloodBankController } = require("./bloodBank.controller");

const router = express.Router();
router.get("/", bloodBankController.list);

module.exports = router;
