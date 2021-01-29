
const auth= require("../middleware/auth.js")

let express = require('express');
let router = express.Router();
 
const tutorial = require('../controllers/tutorials.controller.js');

router.post('/tutorial',auth, tutorial.create);
// router.post('/product/login',auth, user.login);
 router.get('/tutorial',auth, tutorial.retrieveAllTutorials);
// router.get('/product/:id',auth, user.getClientById);
// router.get('/api/customers/filteringbyage', customers.filteringByAge);
// router.get('/api/customers/pagination', customers.pagination);
// router.get('/api/customers/pagefiltersort', customers.pagingfilteringsorting);
// router.put('/api/customers/update/:id', customers.updateById);
// router.delete('/api/customers/delete/:id', customers.deleteById);

module.exports = router;