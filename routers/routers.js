const express = require('express');
const router = express.Router();  

const userAccountController = require('../controllers/userAccountPageController');
const homeController = require('../controllers/homeController');
const loginController = require('../controllers/loginController');
const checkAuth = require('../controllers/checkAuthController');

//const path = require('path');
//const basePath = path.join(__dirname, '..', 'views');

router.get('/', loginController)
router.get('/home',checkAuth, homeController);
router.get('/account',checkAuth, userAccountController);

module.exports = router;  


