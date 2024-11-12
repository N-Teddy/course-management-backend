const User = require('../models/User');
const UserOTP = require('../models/UserOTP');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const random = (length) => {

    const characters = '1234567890QWERTYUIOPASDFGHJKLMZXCVBN';
    let code = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        code += characters.charAt(randomIndex);
    }

}

// hash password
const hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    } catch (error) {
        throw new Error('Invalid password: ' + error.message)
    }
}

const hashCompare = async (value, hash) => {
    try {
        return await bcrypt.compare(value, hash);
    } catch (error) {
        return false;
    }
}

const register = async (data) => {
    const password = await hashPassword(data.password);
    data.password = password;

    const user = new User(data);
    await user.save();
    return {
        error: false,
        message: 'User registered successfully'
    }
}

const login = async (user, password) => {

    const compare = await hashCompare(password, user.password);
    if (!compare) {
        return {
            error: true,
            message: 'Invalid email or password.'
        }
    }

    const token = jwt.sign({ id: user._id }, 'secret_key', { expiresIn: '1h' });
    return {
        error: false,
        message: 'Login successful.',
        token: token
    }
}

const verifyIfIsUnique = async (field, value) => {
    return await User.findOne({[field]: value})
}

const generateExpired = (minutes) => {
    return new Date(new Date().getTime() + (60 * 1000 * minutes))
}

const generateOTP = async (id_user) => {

    try {
        const code = random(5);
        const otp = {
            code: code,
            expired_at: generateExpired(10),
            id_user: id_user
        }
        await UserOTP.create({ otp })
        return { error: false, data: otp }
    } catch (error) {
        return { error: true, message: 'Failed to generate OTP' }
    }
}

const resetPassword = async (password, code) => {
    try {
        const userOTP = await UserOTP.findOne({ code: code });
        if (!userOTP) {
            return { error: true, message: 'Invalid OTP' }
        }
        const user = await User.findById(userOTP.id_user);
        if (!user) {
            return { error: true, message: 'User not found' }
        }
        user.password = hashPassword(password)
        await user.save();

        UserOTP.deleteOne({ _id: UserOTP._id })
    } catch (error) {
        return {
            error: true,
            message: 'Failed to reset password' + error.message
        }
    }
}

module.exports = {verifyIfIsUnique, register, login, generateOTP, resetPassword}