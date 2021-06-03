const express = require('express');
const router = express.Router();
const auth = require('../controller/authController');

router.get('/', auth, (req, res) => { res.send("fsd") })

module.exports = router;