const express = require('express');
const router = express.Router();  

const userAccountController = require('../controllers/userAccountPageController');
const homeController = require('../controllers/homeController');
const loginController = require('../controllers/loginController');

const path = require('path');
const basePath = path.join(__dirname, '..', 'views');

router.get('/', loginController)
router.get('/home', homeController);
router.get('/account', userAccountController);

module.exports = router;  


