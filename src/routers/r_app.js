const routes = require('express').Router();
const productRouter = require('./r_product')

const path = "/product";

routes.use(path, productRouter);

module.exports = routes;
