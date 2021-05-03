const router = require('express').Router();
// init express router for making requests

const apiRoutes = require('./api');
//require api routes
const homeRoutes = require('./homeRoutes');
// require routing page that serves handlebars content

router.use('/', homeRoutes);
router.use('/api', apiRoutes);

module.exports = router;