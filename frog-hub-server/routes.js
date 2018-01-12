'use strict';

const Router = require('xiaolan-router');

let router = new Router();

router.get('', 'getProject');
router.put('','register')


module.exports = router.map();
