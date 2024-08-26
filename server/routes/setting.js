// routes/setting.js

const express = require("express");
const upload = require("../middlewares/upload"); // Existing upload middleware
const settingController = require("../controllers/setting");

const router = express.Router();

// Route to upload welcome logo
router.post("/upload-logo", upload, settingController.uploadWelcomeLogo);

// Route to get settings
router.get("/", settingController.getSettings);

module.exports = router;
