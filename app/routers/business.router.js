
const auth= require("../middleware/auth.js")

let express = require('express');
let router = express.Router();
 
const business = require('../controllers/business.controller.js');

router.post('/business/signup', business.create);
router.post('/business/login', business.login);
router.get('/business/unverified', business.getUnverified);
router.put('/business/:id', business.updateById);


// router.get('/api/users/all',auth, user.retrieveAllClients);
// router.get('/users/me',auth, user.getMe);
// router.get('/api/customers/filteringbyage', customers.filteringByAge);
// router.get('/api/customers/pagination', customers.pagination);
// router.get('/api/customers/pagefiltersort', customers.pagingfilteringsorting);
// router.put('/users',auth, user.updateById);
// router.delete('/api/customers/delete/:id', customers.deleteById);

module.exports = router;