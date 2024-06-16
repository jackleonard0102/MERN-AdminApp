
const express = require("express");

const { checkRoles } = require("../middlewares/checkRole.js");
const upload = require("../middlewares/upload.js");
const userController = require("../controllers/user.js");
const { ROLES } = require("../config/constants.js");

const router = express.Router();

router.post("/updateProfile", userController.updateProfile);
router.post("/updatePassword", userController.updatePassword);
router.post("/deleteAccount", userController.deleteAccount);
router.post("/upload", upload, userController.upload);
router.get('/me', userController.getUser);

router.get("/", checkRoles([ROLES.ADMIN]), userController.getUsers);

module.exports = router;
