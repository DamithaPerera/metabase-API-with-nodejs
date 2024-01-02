const {Router} = require('express');
const {testController} = require("./controller");
const routes = Router();

routes.post('/', testController);



module.exports = routes