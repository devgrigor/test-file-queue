'use strict';

let  express = require('express');
let  controller = require('./files-process.controller.js');
let  router = express.Router();

router.post('/', controller.create)

module.exports = router;