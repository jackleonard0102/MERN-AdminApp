// routes/index.js
const express = require('express');
require('../config/passport');

const router = express.Router();

const authRouter = require('./auth');
const userRouter = require('./user');
const logoRouter = require('./logo')

const authMiddleware = require('../middlewares/auth');
const { jwtAuth } = authMiddleware;

router.get('/', (req, res) => {
  return res.json({
    message: 'This is API interface',
  });
});

router.use('/auth', authRouter);
router.use('/users', jwtAuth, userRouter);
router.use('/logos', logoRouter);

module.exports = router;
