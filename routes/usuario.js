const express = require('express');
const router = express.Router();
const { login, cadastro, store, editar, update, adicionarFavorito, exibirFavoritos } = require('../controllers/usuarioContoller');

/* GET users listing. */
router.get('/login', login);

router.get('/cadastro', cadastro);
router.post('/cadastro', store);

router.get('/editar', editar);
router.patch('/editar', update);

router.get('/favorito/:usuario_id', exibirFavoritos)
router.post('/favorito/:usuario_id/:favorito_id', adicionarFavorito)

module.exports = router;