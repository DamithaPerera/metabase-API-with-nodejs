const {Router} = require("express");
const {testController, cardController} = require("./controller");
const routes = Router();

routes.post('/', testController);
routes.post('/card', cardController);



module.exports = routes;