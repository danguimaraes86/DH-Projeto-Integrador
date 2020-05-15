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

/* GET home page. */
router.get('/criar', create);
router.post('/criar/:usuario_id', store);

router.get('/todos/:usuario_id', mostrarTodosPostsDeUmUsuario);

router.get('/:post_id/curtidas', mostrarTodasCurtidasPost)

router.get('/:post_id/comentarios', mostrarTodosComentariosDeUmPost)

router.get('/feed/geral', mostrarTodosPostsNoFeed)
router.get('/feed/favorito/:usuario_id', mostrarTodosPostsDoSeusFavoritos)

module.exports = router;
