const express = require('express');
const router = express.Router();
const { 
  create,
  store,
  mostrarTodosPostsDeUmUsuario,
  mostrarTodasCurtidasPost,
  mostrarTodosComentariosDeUmPost,
  mostrarTodosPostsDoSeusFavoritos,
  mostrarPostCompleto,
  editarPost,
  excluirPost
} = require('../controllers/postController');

const multer = require('multer')
const path = require('path')
const auth = require('../middlewares/auth')

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join("public", "images","fotos-post"))
    },
    filename: function (req, file, cb) {    
        cb(null, `${Date.now()}${path.extname(file.originalname)}`);
    }
})
   
let upload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
    let extensaoUpload = path.extname(file.originalname).toLowerCase();
    const extensaoImg = [".jpeg", ".png", ".tiff", ".svg", ".jpg", ".jfif"];
    const extensaoVideo = [".mp4", ".mkv", ".avi", ".mov", ".m4v"];
    
    if(extensaoImg.includes(extensaoUpload) || extensaoVideo.includes(extensaoUpload) ){
      return cb(null, true)
    }else{
      return cb(null, false )
    }
  } 
})

/* GET home page. */
router.get('/criar', create);
router.post('/criar',upload.any(), store);

router.get('/todos/:usuario_id', mostrarTodosPostsDeUmUsuario);

router.get('/:post_id/curtidas', mostrarTodasCurtidasPost)

router.get('/:post_id/comentarios', mostrarTodosComentariosDeUmPost)

router.get('/feed/favorito/:usuario_id', mostrarTodosPostsDoSeusFavoritos)

router.get('/post-completo',auth, mostrarPostCompleto)

router.post('/editar/:post_id', auth, upload.any(), editarPost)
router.post('/excluir/:post_id', auth, excluirPost)

module.exports = router;
