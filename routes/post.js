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
  editarPost
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
   
let upload = multer({ storage: storage })

/* GET home page. */
router.get('/criar', create);
router.post('/criar',upload.any(), store);

router.get('/todos/:usuario_id', mostrarTodosPostsDeUmUsuario);

router.get('/:post_id/curtidas', mostrarTodasCurtidasPost)

router.get('/:post_id/comentarios', mostrarTodosComentariosDeUmPost)

router.get('/feed/favorito/:usuario_id', mostrarTodosPostsDoSeusFavoritos)

router.get('/post-completo',auth, mostrarPostCompleto)

router.post('/editar/:post_id', auth, upload.any(), editarPost)

module.exports = router;
