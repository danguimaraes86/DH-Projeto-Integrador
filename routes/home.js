const express = require('express');
const router = express.Router();

const { index } = require('../controllers/homeController');
const auth = require("../middlewares/auth")

router.get('/', auth, index);

module.exports = router;
