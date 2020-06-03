const express = require('express');
const router = express.Router();
const { store, excluirComentario } = require('../controllers/comentarioController.js')

router.post('/post', store);
router.get('/excluir/:id', excluirComentario)

module.exports = router