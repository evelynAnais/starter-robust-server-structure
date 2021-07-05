const router = require('express').Router();
const flipsRouter = require('../flips/flips.router')
const controller = require('./counts.controller');
const methodNotAllowed = require('../errors/methodNotAllowed')

router.use('/:countId/flips', controller.countExists, flipsRouter);

router.route('/:countId').get(controller.read).all(methodNotAllowed);
router.route('/').get(controller.list).all(methodNotAllowed);

module.exports = router;