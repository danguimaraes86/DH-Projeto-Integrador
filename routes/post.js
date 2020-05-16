const express = require('express');
const router = express.Router();
const { 
  create,
  store,
  mostrarTodosPostsDeUmUsuario,
  mostrarTodasCurtidasPost,
  mostrarTodosComentariosDeUmPost,
  mostrarTodosPostsNoFeed,
  mostrarTodosPostsDoSeusFavoritos
} = require('../controllers/postController');

const multer = require('multer')
const path = require('path')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join("public", "images","fotos-post"))
    },
    filename: function (req, file, cb) {
        const nome = req.session.usuario.nome
        cb(null, `${nome}-${Date.now()}${path.extname(file.originalname)}`);
    }
  })
   
  var upload = multer({ storage: storage })

/* GET home page. */
router.get('/criar', create);
router.post('/criar',upload.any(), store);

router.get('/todos/:usuario_id', mostrarTodosPostsDeUmUsuario);

router.get('/:post_id/curtidas', mostrarTodasCurtidasPost)

router.get('/:post_id/comentarios', mostrarTodosComentariosDeUmPost)

router.get('/feed/geral', mostrarTodosPostsNoFeed)
router.get('/feed/favorito/:usuario_id', mostrarTodosPostsDoSeusFavoritos)

module.exports = router;
