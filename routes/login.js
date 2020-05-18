const express = require('express');
const router = express.Router();

const {index, login} = require('../controllers/loginController')
const {check, validationResult, body} = require('express-validator');


router.get('/', index);

router.post('/',[
    check('email').isEmail().withMessage("Digite um email!"),
    check('senha').isLength({min:3}).withMessage("A senha deve conter no minímo 3 caracteres"),
], login);

module.exports = router;