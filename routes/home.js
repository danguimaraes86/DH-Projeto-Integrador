const express = require('express');
const router = express.Router();
const { index } = require('../controllers/homeController');
const autorizacaoLogin = require('../middlewares/autorizacaoLogin');

/* GET home page. */
router.get('/',autorizacaoLogin, index);

module.exports = router;
