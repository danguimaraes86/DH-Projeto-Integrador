const express = require('express');
const router = express.Router();
const { create, store, show } = require('../controllers/postController');

/* GET home page. */
router.get('/criar', create);
router.post('/criar',store);

router.get('/completo', show);

module.exports = router;
