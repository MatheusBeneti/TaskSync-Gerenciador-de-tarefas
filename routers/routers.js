const express = require('express');
const router = express.Router();  

const userAccountController = require('../controllers/userAccountPageController');
const homeController = require('../controllers/homeController');
const loginController = require('../controllers/loginController');
const {checkAuth} = require('../helpers/checkAuth');
const teamsController = require('../controllers/teamsController');

router.get('/', loginController.loadPage);
router.post('/login', loginController.validateLogin);
router.post('/newAccount', loginController.validateNewAccount);
router.get('/logout', loginController.logout);

router.get('/home',  homeController.loadPage);
router.post('/addTask',  homeController.addTask);

router.get('/teams', checkAuth,  teamsController);
router.get('/account', checkAuth,  userAccountController);


module.exports = router;  


