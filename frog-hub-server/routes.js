'use strict';

const Router = require('xiaolan-router');

let router = new Router();

router.get('/{project}', 'getProject');

router.post('/register', 'register');

module.exports = router.map();
