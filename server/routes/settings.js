// routes/setting.js

const express = require("express");
const upload = require("../middlewares/upload"); // Existing upload middleware
const welcomeController = require("../controllers/settings/welcome");

const router = express.Router();

// Route to upload welcome logo
router.post("/upload-logo", upload, welcomeController.uploadWelcomeLogo);

// Route to update site code and app version
router.put("/update", welcomeController.updateWelcomes);
router.get('/', welcomeController.getWelcomes); // This is now publicly accessible

module.exports = router;
