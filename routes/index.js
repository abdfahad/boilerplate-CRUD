const { Router } = require("express");
const router = Router();

// Routers
const antonRouter = require("./anton");
const testRuleRouter = require("./test");

router.use("/test", testRuleRouter);

router.use("/antons", antonRouter);

module.exports = router;
