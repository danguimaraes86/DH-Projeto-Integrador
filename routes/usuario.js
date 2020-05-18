const express = require('express');
const router = express.Router();

const {
  cadastro, 
  store, 
  editar, 
  update, 
  adicionarFavorito, 
  exibirFavoritos 
} = require('../controllers/usuarioContoller');

const multer = require('multer')
const path = require('path')
const auth = require('../middlewares/auth')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join("public", "images","fotos-perfil"))
    },    
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}${path.extname(file.originalname)}`);
    }
  });
   
  var upload = multer({ storage: storage })

router.get('/cadastro', cadastro);
router.post('/cadastro',upload.any(), store);

router.get('/editar', auth, editar);
router.post('/editar', upload.any(), update);

router.get('/favorito/:usuario_id', exibirFavoritos)
router.post('/favorito/:usuario_id/:favorito_id', adicionarFavorito)

module.exports = router;