const express = require("express");
const applicationAuth = require("../../util/applicationAuth");

const router = express.Router();
router.use(applicationAuth);
router.get("/me", require("./me"));
router.get("/user", require("./user"));

module.exports = router;