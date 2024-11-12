// const courseService = require('../services/course.service');
const User = require('../models/User')
const authService = require('../services/auth.service');

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({
            error: true,
            message: 'failed to get all users'
        })
    }
}

const getOneUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.find({ _id: id });
        if (!user) {
            res.status(404).json({
                error: true,
                message: 'User not found'
            })
        } else {
            res.json(user);
        }
    } catch (error) {

    }
}
const addUser = async (req, res) => {

    const body = req.body;

    const isUniqueEmail = await authService.verifyIfIsUnique('email', body.email);
    if (isUniqueEmail) {
        return res.status(400).json({
            error: true,
            message: 'email already exists'
        })
    }

    const newUser = new User({
        name: body.name,
        email: body.email,
        password: body.password
    })

    try {
        await newUser.save();
        res.status(201).json({
            error: false,
            message: 'User added successfully',
            data: newUser
        });
    } catch (error) {
        res.status(400).json({
            error: true,
            message: 'failed to add User'
        })
    }

}
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const body = req.body;
        await User.findByIdAndUpdate(id, { ...body });
        res.json({
            error: false,
            message: 'User updated successfully'
        });
    } catch (error) {
        res.status(404).json({
            error: true,
            message: 'User not found'
        });
    }
}
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        await User.findByIdAndDelete(id);
        res.json({
            error: false,
            message: 'User deleted successfully'
        });
    } catch (error) {
        res.status(404).json({
            error: true,
            message: 'User not found'
        })
    }
}

module.exports = { getAllUsers, getOneUser, addUser, deleteUser, updateUser }