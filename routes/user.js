
var express = require('express');
var router = express.Router();

const { login } = require('../controllers/user');

router.post('/login', login);

module.exports = router;