const express = require('express');
const router = express.Router();
const { store } = require('../controllers/curtidaController.js')

router.get('/post/:id', store)

module.exports = router