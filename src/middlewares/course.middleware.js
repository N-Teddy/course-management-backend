const Instructor = require('../models/Instructor');
const verifyEntries = (req, res, next) => {
    const { title, description, duration, category } = req.body;
    if (!title || !description || !duration, !category) {
        res.status(400).json({
            error: true,
            message: 'course title, description, instructor and category required'
        });

        return
    }

    next();
}

module.exports = { verifyEntries }