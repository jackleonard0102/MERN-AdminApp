// routes/setting.js

const express = require("express");
const upload = require("../middlewares/upload"); // Existing upload middleware
const settingController = require("../controllers/setting");

const router = express.Router();

// Route to upload welcome logo
router.post("/upload-logo", upload, settingController.uploadWelcomeLogo);

// Route to update site code and app version
router.put("/update", settingController.updateSettings);
router.get('/', settingController.getSettings); // This is now publicly accessible

module.exports = router;
