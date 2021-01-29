let express = require('express');
let router = express.Router();
let upload = require('../config/multer.config.js');

const practice = require('../controllers/practices.controller.js');



router.post('/practice', upload.single("file"), practice.create);

router.get('/practice', practice.listAllPractices);

router.get('/practice/:id', practice.downloadFile);

module.exports = router;