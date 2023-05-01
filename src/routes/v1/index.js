const express = require('express');
const router = express.Router();

const toolsApi = require('./tools.routes');

router.use('/tools', toolsApi);

module.exports = router;