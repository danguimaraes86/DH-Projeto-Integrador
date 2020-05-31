const express = require('express');
const router = express.Router();

const {index, login} = require('../controllers/loginController')
const { validarLogin } = require('../middlewares/validator')

router.get('/', index);

router.post('/', validarLogin, login);

module.exports = router;