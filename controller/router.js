const {Router} = require("express");
const {testController, cardController, cardFilterController} = require("./controller");
const routes = Router();

routes.get('/card', cardController);
routes.get('/model/search', cardFilterController);



module.exports = routes;