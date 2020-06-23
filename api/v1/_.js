const express = require("express");
const applicationAuth = require("../../util/applicationAuth");

const router = express.Router();
router.use(applicationAuth);
router.get("/application", require("./application"));
router.post("/plus", require("./plus.js"));
router.get("/session", require("./session"));
router.get("/token", require("./token"));
router.get("/user", require("./user"));

module.exports = router;
