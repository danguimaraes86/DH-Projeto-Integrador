const express = require('express');
const router = express.Router();

const { index, update, destroy } = require('../controllers/configuracaoController');
const auth = require('../middlewares/auth');
// const {check, validationResult, body} = require('express-validator');

router.get('/usuario',auth, index);
router.post('/usuario',auth, update);

router.post('/usuario/excluir',auth, destroy);

module.exports = router