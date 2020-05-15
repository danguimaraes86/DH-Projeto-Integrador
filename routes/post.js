const express = require('express');
const router = express.Router();
const { 
  create,
  store,
  show,
  mostrarTodasCurtidasPost,
  mostrarTodosComentariosDeUmPost
} = require('../controllers/postController');

/* GET home page. */
router.get('/criar', create);
router.post('/criar/:usuario_id', store);

router.get('/todos/:usuario_id', show);

router.get('/:post_id/curtidas', mostrarTodasCurtidasPost)

router.get('/:post_id/comentarios', mostrarTodosComentariosDeUmPost)

module.exports = router;
