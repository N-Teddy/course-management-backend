const getAllInstructors = async (req, res) => {
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


const addInstructor = async (req, res) => {

    const body = req.body;

    const newCourse = new Course({
        specialty: body.specialty,
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