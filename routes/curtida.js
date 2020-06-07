const express = require('express');
const router = express.Router();
const { store, index } = require('../controllers/curtidaController.js')

router.get('/post/:id', store)

router.get('/show/post/:id', index)

module.exports = router