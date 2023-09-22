const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController.js");
const userControllers = require("../controllers/userControllers.js");
const { verifyUser } = require("../middleware/verifyUser.js");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Specify the directory where uploaded files will be stored
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`); // Specify the filename for uploaded files
  },
});

const upload = multer({ storage: storage });
router.post("/register", authController.register);
router.post("/login", authController.login);
router.post(
  "/create",
  verifyUser,
  upload.single("file"),
  express.static("uploads"),
  userControllers.createBlog
);
router.get(
  "/getblogs",
  verifyUser,
  userControllers.getAllBlogs
);
router.put("/blogs/:id/like", verifyUser, userControllers.handleLike);
router.put("/blogs/:id/dislikes", verifyUser, userControllers.handleDislike);
router.get(
  "/myblogs",
  verifyUser,
  express.static("uploads"),
  userControllers.getMyBlogs
);
router.delete("/delete", verifyUser, userControllers.deleteBlog);

module.exports = router;
