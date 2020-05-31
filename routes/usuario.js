const express = require('express');
const router = express.Router();

const {
  cadastro,
  store,
  editar,
  update,
  configuracaoConta,
  adicionarFavorito,
  removerFavorito
} = require('../controllers/usuarioContoller');

const { validarCadastro } = require('../middlewares/validator')

const multer = require('multer')
const path = require('path')
const auth = require('../middlewares/auth')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join("public", "images", "fotos-perfil"))
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  }
});

var upload = multer({ storage: storage })

router.get('/cadastro', cadastro);
router.post('/cadastro', upload.any(), validarCadastro, store);

router.get('/editar', auth, editar);
router.post('/editar', upload.any(), update);

router.get('/configuracao', auth, configuracaoConta);

router.get('/adicionar/favorito/:id', auth, adicionarFavorito);

router.get('/remover/favorito/:id', auth, removerFavorito)

module.exports = router;