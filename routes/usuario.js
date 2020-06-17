const express = require('express');
const router = express.Router();

const {
  cadastro,
  store,
  editar,
  update,
  configuracaoConta,
  adicionarFavorito,
  removerFavorito,
  perfilVisitante
} = require('../controllers/usuarioContoller');

const { validarCadastro } = require('../middlewares/validator')

const multer = require('multer')
const path = require('path')
const auth = require('../middlewares/auth')

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join("images", "fotos-perfil"))
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  }
});

let upload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
    let extensaoUpload = path.extname(file.originalname).toLowerCase();
    const extensaoImg = [".jpeg", ".png", ".tiff", ".svg", ".jpg", ".jfif"];
    const extensaoVideo = [".mp4", ".mkv", ".avi", ".mov", ".m4v"];
    
    if(extensaoImg.includes(extensaoUpload) || extensaoVideo.includes(extensaoUpload) ){
      return cb(null, true)
    }else{
      return cb(null, false)
    }
  } 
})

router.get('/cadastro', cadastro);
router.post('/cadastro', upload.any(), validarCadastro, store);

router.get('/editar', auth, editar);
router.post('/editar', upload.any(), update);

router.get('/configuracao', auth, configuracaoConta);

router.get('/adicionar/favorito/:id', auth, adicionarFavorito);
router.get('/remover/favorito/:id', auth, removerFavorito)

router.get('/:nickname', auth, perfilVisitante)

module.exports = router;