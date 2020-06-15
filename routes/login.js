const express = require('express');
const router = express.Router();

const {index, login, verify} = require('../controllers/loginController')
const { validarLogin } = require('../middlewares/validator')

router.get('/', index);

router.post('/', validarLogin, login);

router.post('/api/google', verify);

module.exports = router;