/**
 * Copyright by https://loizenai.com
 * youtube loizenai
 */
const auth= require("../middleware/auth.js")

let express = require('express');
let router = express.Router();
 
const user = require('../controllers/users.controller.js');

router.post('/users/signup', user.create);
router.post('/users/login', user.login);
// router.get('/api/users/all',auth, user.retrieveAllClients);
router.get('/users/me',auth, user.getMe);
// router.get('/api/customers/filteringbyage', customers.filteringByAge);
// router.get('/api/customers/pagination', customers.pagination);
// router.get('/api/customers/pagefiltersort', customers.pagingfilteringsorting);
router.put('/users',auth, user.updateById);
// router.delete('/api/customers/delete/:id', customers.deleteById);

module.exports = router;