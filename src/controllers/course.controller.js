const courseService = require('../services/course.service');
const Course = require('../models/Course');
const Instructor = require('../models/Instructor');


const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find();
        res.json(courses);
    } catch (error) {
        res.status(500).json({
            error: true,
            message: 'failed to get all courses'
        })
    }
}

const getOneCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const course = await Course.find({ _id: id });
        if (!course) {
            res.status(404).json({
                error: true,
                message: 'course not found'
            })
        } else {
            res.json(course);
        }
    } catch (error) {

    }
}

const addCourse = async (req, res) => {

    const body = req.body;

    const newCourse = new Course({
        title: body.title,
        description: body.description,
        duration: body.duration,
        category: body.category
    })
 

    try {
        await newCourse.save();
        res.status(201).json({
            error: false,
            message: 'course added successfully',
            data: newCourse
        });
    } catch (error) {
        res.status(400).json({
            error: true,
            message: 'failed to add course'
        })
    }

}

const updateCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const body = req.body;
        await Course.findByIdAndUpdate(id, { ...body });
        res.json({
            error: false,
            message: 'course updated successfully'
        });
    } catch (error) {
        res.status(404).json({
            error: true,
            message: 'Course not found'
        });
    }
}
const deleteCourse = async (req, res) => {
    try {
        const { id } = req.params;
        await Course.findByIdAndDelete(id);
        res.json({
            error: false,
            message: 'course deleted successfully'
        });
    } catch (error) {
        res.status(404).json({
            error: true,
            message: 'course not found'
        })
    }
}

module.exports = { getAllCourses, getOneCourse, addCourse, deleteCourse, updateCourse }