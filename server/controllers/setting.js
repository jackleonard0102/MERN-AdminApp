// controllers/setting.js

const Setting = require("../models/settingModel");
const { _log, _error } = require("../utils/logging");

// Upload or update welcome logo
exports.uploadWelcomeLogo = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    const logoPath = 'upload/logo.png'; // Fixed path for logo

    // Update the setting document with the new logo path
    let setting = await Setting.findOne();
    if (setting) {
      setting.Logopath = logoPath;
    } else {
      setting = new Setting({ Logopath: logoPath, siteCode: "DEFAULT_CODE", appVersion: "1.0" });
    }

    await setting.save();
    return res.status(200).json({ success: true, message: "Logo uploaded successfully", logoPath });
  } catch (error) {
    _error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Get current settings
exports.getSettings = async (req, res) => {
  try {
    const setting = await Setting.findOne();
    return res.status(200).json({ success: true, setting });
  } catch (error) {
    _error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
