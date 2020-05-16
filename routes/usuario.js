const express = require('express');
const router = express.Router();
const { login, cadastro, store, editar, update, adicionarFavorito, exibirFavoritos } = require('../controllers/usuarioContoller');
const multer = require('multer')
const path = require('path')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join("public", "images","fotos-perfil"))
    },
    filename: function (req, file, cb) {
        const nome = req.body.nome
        cb(null, `${nome}-${Date.now()}${path.extname(file.originalname)}`);
    }
  })
   
  var upload = multer({ storage: storage })

/* GET users listing. */


router.get('/cadastro', cadastro);
router.post('/cadastro',upload.any(), store);

router.get('/editar', editar);
router.patch('/editar', update);

router.get('/favorito/:usuario_id', exibirFavoritos)
router.post('/favorito/:usuario_id/:favorito_id', adicionarFavorito)

module.exports = router;