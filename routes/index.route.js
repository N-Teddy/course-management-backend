const { Router } = require('express');
const router = Router();
const indexController = require('../src/controllers/index.controller');
const {validForm} = require('../src/middlewares/validations/form.validation')

router.post('/', validForm, indexController.testValidationWithJoi);

module.exports = router;