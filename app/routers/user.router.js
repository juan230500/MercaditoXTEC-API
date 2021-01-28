/**
 * Copyright by https://loizenai.com
 * youtube loizenai
 */
const auth= require("../middleware/auth.js")

let express = require('express');
let router = express.Router();
 
const user = require('../controllers/users.controller.js');

router.post('/api/users/create', user.create);
// router.get('/api/users/all',auth, user.retrieveAllClients);
router.get('/api/users/onebyid/:id',auth, user.getClientById);
// router.get('/api/customers/filteringbyage', customers.filteringByAge);
// router.get('/api/customers/pagination', customers.pagination);
// router.get('/api/customers/pagefiltersort', customers.pagingfilteringsorting);
// router.put('/api/customers/update/:id', customers.updateById);
// router.delete('/api/customers/delete/:id', customers.deleteById);

module.exports = router;