// routes/index.js
const express = require('express');
require('../config/passport');

const router = express.Router();

const authRouter = require('./auth');
const userRouter = require('./user');
const personalEntryRoutes = require("./personalEntryRoutes")

const authMiddleware = require('../middlewares/auth');
const { jwtAuth } = authMiddleware;

router.get('/', (req, res) => {
  return res.json({
    message: 'This is API interface',
  });
});

router.use('/auth', authRouter);
router.use('/users', jwtAuth, userRouter);
router.use('/personal-entry', personalEntryRoutes);
module.exports = router;
