const { Router } = require("express");
const router = Router();

// Controllers
const controller = require("../controllers/anton");

const { imageUpload } = require("../middlewares/fileHandler");
const { uploadPicture } = require("../middlewares/uploadFile");
const { dataValidator } = require("../middlewares/dataValidator");
const { checkUserExistence } = require("../middlewares/userCheck");

router.get("/", controller.get);
router.post(
  "/",
  imageUpload.single("profileImage"),
  dataValidator,
  uploadPicture,
  controller.post
);
router.patch("/:atn", checkUserExistence, dataValidator, controller.patch);
router.delete("/:atn", checkUserExistence, controller.delete);
router.get("/:atn", controller.getOne);

module.exports = router;
