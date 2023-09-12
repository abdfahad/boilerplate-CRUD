const { Router } = require("express");
const router = Router();

// Controllers
const controller = require("../controllers/user");

router.use("/", controller.get);
// router
//   .route("/:userId")
//   .all(checkAuth.user)
//   .put(userController.update)
//   .get(userController.userProfile);

module.exports = router;
