const express = require("express");
const applicationAuth = require("../../util/applicationAuth");
const sessionAuth = require("../../util/sessionAuth");

const router = express.Router();
router.use(applicationAuth);
router.get("/me", sessionAuth, require("./me"));
router.get("/user", require("./user"));

module.exports = router;