const Router = require('koa-router');

const ApiController = require('../../controller/api');

const router = new Router({
  prefix: '/api/v1/admin',
});

router.post('/login', ApiController.login);

router.post('/register', ApiController.register);

module.exports = router;
