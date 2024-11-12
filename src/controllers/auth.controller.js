const authService = require('../services/auth.service')

const register = async (req, res) => {
    const create = await authService.register(req.body);
    res.status(201).json(create);
}
const login = async (req, res) => {
    const verify = await authService.login(req.user, req.body.password);
    if (!verify.error) {
        return res.json(verify);
    }

    return res.status(400).json(verify);
 }
const forgotPassword = async (req, res) => { 
    const otp = await authService.generateOTP(req.user._id);
    const status = otp.error ? 400 : 200;
    return res.status(status).json(otp);
}

const verifyOTP = async (req, res) => {
    return res.status(202).json({
        error: false,
        message: 'OTP verification successful.'
    })
}

const resetPassword = async (req, res) => { 
    const { password, code } = req.body
    const reset = await authService.resetPassword(password, code);
    return res.status(reset.error ? 400 : 200).json(reset);
}

module.exports = { register, login, forgotPassword, resetPassword, verifyOTP }