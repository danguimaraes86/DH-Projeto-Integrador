const express = require('express');
const router = express.Router();
const { store, index } = require('../controllers/curtidaController.js')

router.get('/:id', index);

router.get('/post/:id', store);

module.exports = router