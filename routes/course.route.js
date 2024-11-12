const { Router } = require('express');
const router = Router();

const courseController = require('../src/controllers/course.controller');
const courseMiddleware = require('../src/middlewares/course.middleware');

//routes here

router.get('/', courseController.getAllCourses)
router.get('/:id', courseController.getOneCourse)
router.post('/addCourse', courseMiddleware.verifyEntries, courseController.addCourse)
router.put('/update/:id', courseMiddleware.verifyEntries, courseController.updateCourse)
router.delete('/delete/:id', courseController.deleteCourse)

module.exports = router