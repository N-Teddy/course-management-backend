const authService = require('../services/auth.service')

//Register

const verifyRegisterBody = async (req, res, next) => {
    const body = req.body;

    // verify if all information are provided
    if (
        !body.name || !body.email
        || !body.password
    ) {
        return res.status(400).json({
            error: true,
            message: 'body must contain first namem last name, email, password and password confirm'
        })
    }


    // verify if email already exist
    const isUniqueEmail = await authService.verifyIfIsUnique('email', body.email);
    if (isUniqueEmail) {
        return res.status(400).json({
            error: true,
            message: 'email already exists'
        })
    }

    next()

}

// Login

const verifyLoginBody = async (req, res, next) => {
    const body = req.body;

    // verify if email and passwort are provided
    if (!body.email || !body.password) {
        return res.status(400).json({
            error: true,
            message: 'body must contain email and password'
        })
    }

    // verify if user exist 
    const isUserExist = await authService.verifyIfIsUnique('email', body.email)
    if (!isUserExist) {
        return res.status(400).json({
            error: true,
            message: 'Invalid email or password'
        })
    }

    req.user = isUserExist;
    next();

}

const verifyIfUserIsLogged = async (req, res, next) => {
    const auth = req.header('Authorization');
    if (!auth) {
        return res.status(401).json({
            error: true,
            message: 'Access denied. No token provided.'
        });
    }

    const verified = authService.tokenVerify(auth);
    if (!verified) {
        return res.status(401).json({
            error: true,
            message: 'Access denied. Invalid token.'
        });
    }

    const user = await authService.verifyIfIsUnique('_id', verified.id);
    if (!user) {
        return res.status(401).json({
            error: true,
            message: 'Access denied. User not found.'
        });
    }

    req.auth = user;
    next();
};

const verifyEmail = async (req, res, next) => {

    const { email } = req.body;
    const user = await authService.verifyIfIsUnique('email', email);
    if (!user) {
        return res.status(400).json({
            error: true,
            message: 'Email not found!!!'
        });
    }
    req.user = user;
    next()

}

const verifyToken = async (req, res, next) => {

    const { email } = req.body;
    const verify = await authService.verifyOTP(email, body);
    if (!verify) {
        return res.status(400).json({
            error: true,
            message: 'Invalid OTP'
        });
    }

    next()

}
const verifyPassword = async (req, res, next) => {

    const { password, password_confirm, code } = req.body;
    if (!code) {
        res.status(404).json({
            error: true,
            message: 'Please enter code'
        })
    }
    if (password !== password_confirm) {
        return res.status(400).json({
            error: true,
            message: 'Passwords do not match'
        });
    }

    next()

}

module.exports = { verifyRegisterBody, verifyLoginBody, verifyIfUserIsLogged, verifyEmail, verifyPassword, verifyToken }