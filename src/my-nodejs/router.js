const auth = require('./controller');

appRouter.get('/login', auth.login);
appRouter.get('logout', auth.logout);
