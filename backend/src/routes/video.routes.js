const router = require("express").Router();

const auth = require("../middlewares/auth.middleware");
const tenant = require("../middlewares/tenant.middleware");
const role = require("../middlewares/role.middleware");
const upload = require("../utils/multer");

const {
  uploadVideo,
  streamVideoById,
  getVideos,
} = require("../controllers/video.controller");

console.log("UPLOAD TYPE:", typeof upload);
console.log("UPLOAD.SINGLE TYPE:", typeof upload.single);

// List videos
router.get("/", auth, tenant, role(["viewer", "editor", "admin"]), getVideos);

// Upload video
router.post(
  "/upload",
  auth,
  tenant,
  role(["editor", "admin"]),
  upload.single("video"),
  uploadVideo
);

// Stream video (token handled inside controller)
router.get("/stream/:id", streamVideoById);

module.exports = router;
