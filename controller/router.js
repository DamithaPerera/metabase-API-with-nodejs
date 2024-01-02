const {Router} = require("express");
const {testController, cardController, cardFilterController} = require("./controller");
const routes = Router();

routes.post('/card', cardController);
routes.post('/card/filter', cardFilterController);



module.exports = routes;