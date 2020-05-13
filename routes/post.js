const express = require('express');
const router = express.Router();
const { create, store, show } = require('../controllers/postController');

/* GET home page. */
router.get('/criar', create);
router.post('/criar/:usuario_id',store);

router.get('/todos/:usuario_id', show);

module.exports = router;
