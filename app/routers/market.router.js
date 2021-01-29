
const auth= require("../middleware/auth.js")

let express = require('express');
let router = express.Router();
 
const market = require('../controllers/market.controller.js');

router.get('/market',auth, market.listAllMarket);
// router.get('/product/:id',auth, user.getClientById);
// router.get('/api/customers/filteringbyage', customers.filteringByAge);
// router.get('/api/customers/pagination', customers.pagination);
// router.get('/api/customers/pagefiltersort', customers.pagingfilteringsorting);
// router.put('/api/customers/update/:id', customers.updateById);
// router.delete('/api/customers/delete/:id', customers.deleteById);

module.exports = router;