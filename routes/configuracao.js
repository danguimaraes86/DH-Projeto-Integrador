const express = require('express');
const router = express.Router();

const { index, update, destroy, recuperarSenha, indexAlterarSenha, alterarSenha } = require('../controllers/configuracaoController');
const auth = require('../middlewares/auth');
const { validarConfiguracao } = require('../middlewares/validator')

router.get('/usuario',auth, index);
router.post('/usuario',auth, validarConfiguracao, update);

router.post('/usuario/excluir',auth, destroy);

router.post('/recuperar/senha', recuperarSenha );

router.get('/senha/alterar', indexAlterarSenha );
router.post('/senha/alterar', alterarSenha );

module.exports = router