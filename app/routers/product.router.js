
const auth= require("../middleware/auth.js")

let express = require('express');
let router = express.Router();
 
const product = require('../controllers/products.controller.js');

router.post('/product',auth, product.create);
// router.post('/product/login',auth, user.login);
// router.get('/product',auth, product.retrieveProducts);
// router.get('/product/:id',auth, user.getClientById);
// router.get('/api/customers/filteringbyage', customers.filteringByAge);
// router.get('/api/customers/pagination', customers.pagination);
// router.get('/api/customers/pagefiltersort', customers.pagingfilteringsorting);
// router.put('/api/customers/update/:id', customers.updateById);
// router.delete('/api/customers/delete/:id', customers.deleteById);

module.exports = router;