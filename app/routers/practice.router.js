let express = require('express');
let router = express.Router();
let upload = require('../config/multer.config.js');
 
const practice = require('../controllers/practices.controller.js');



router.post('/practice', upload.single("file"), practice.create);
// router.post('/api/file/multiple/upload', upload.array('files', 4), fileWorker.uploadMultipleFiles);
 
// router.get('/api/file/info', fileWorker.listAllFiles);
 
router.get('/practice/:id', practice.downloadFile);
 
module.exports = router;