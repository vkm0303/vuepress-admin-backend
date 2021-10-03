
var express = require('express');
var router = express.Router();

const { auth } = require('../middlewares/auth');
const { getList, getContent, save, uploadImg } = require('../controllers/article');

router.get('/list', getList);
router.get('/:articleName', getContent);
router.patch('/:articleName', save);
router.post('/image/:articleName', uploadImg);

module.exports = router;