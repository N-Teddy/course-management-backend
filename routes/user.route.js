const { Router } = require('express');
const router = Router();

const userController = require('../src/controllers/user.controller')
//routes here

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getOneUser);
router.post('/create', userController.addUser);
router.put('/update/:id', userController.updateUser);
router.delete('/delete/:id', userController.deleteUser);

module.exports = router