
const auth= require("../middleware/auth.js")

let express = require('express');
let router = express.Router();
 
const order = require('../controllers/orders.controller.js');

router.post('/order',auth, order.create);
router.put('/order/:id',auth, order.updateById);
router.get('/order/message/:id',auth, order.getMessages);

// router.post('/product/login',auth, user.login);
// router.get('/product',auth, product.retrieveProducts);
router.get('/stock',auth, order.getStock);
router.get('/purchase',auth, order.getPurchases);

router.get('/order/:id',auth, order.getOrderById);

// router.get('/api/customers/filteringbyage', customers.filteringByAge);
// router.get('/api/customers/pagination', customers.pagination);
// router.get('/api/customers/pagefiltersort', customers.pagingfilteringsorting);
// router.put('/api/customers/update/:id', customers.updateById);
// router.delete('/api/customers/delete/:id', customers.deleteById);

module.exports = router;