const { Router } = require('express');
const router = Router();

const authController = require('../src/controllers/auth.controller');
const { verifyRegisterBody, verifyLoginBody, verifyEmail, verifyPassword } = require('../src/middlewares/auth.middleware');

//routes here

router.post('/register', verifyRegisterBody, authController.register)
router.post('/login', verifyLoginBody, authController.login)

router.post('/forgot-password', verifyEmail, authController.forgotPassword)
// router.post('/verify-token', verifyToken, authController.verifyToken)
router.post('/reset-password', verifyPassword, authController.resetPassword)

module.exports = router