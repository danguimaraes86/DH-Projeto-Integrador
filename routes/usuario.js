const express = require('express');
const router = express.Router();
const { login, cadastro, store, editar, upDate  } = require('../controllers/usuarioContoller');

/* GET users listing. */
router.get('/login', login);

router.get('/cadastro', cadastro);
router.post('/cadastro', store);

router.get('/editar', editar);
router.patch('/editar', upDate);

module.exports = router;