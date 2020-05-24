const express = require('express');
const router = express.Router();

const { index, mostrarUsuarios } = require('../controllers/pesquisaController')
const auth = require('../middlewares/auth')

router.get('/usuarios',auth, index);
router.post('/usuarios',auth, mostrarUsuarios);

module.exports = router