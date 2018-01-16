'use strict';

const Router = require('xiaolan-router');

let router = new Router();

router.get('','project_list');
router.get('/{project}', 'get_project');
router.put('','register_service')


module.exports = router.map();
