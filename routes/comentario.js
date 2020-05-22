const express = require('express');
const router = express.Router();
const { store } = require('../controllers/comentarioController.js')

router.post('/post', store)

module.exports = router