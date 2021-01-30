let express = require('express');
let router = express.Router();
let upload = require('../config/multer.config.js');

const practice = require('../controllers/practices.controller.js');



router.post('/practice', upload.single("file"), practice.create);
router.post('/practice/:id', upload.single("file"), practice.updateById);

router.get('/practice', practice.listAllPractices);
router.get('/practice/:id', practice.getPracticeById);
router.get('/practice/dowload/:id', practice.downloadFile);

module.exports = router;