const express = require('express');
const router = express.Router();  

const userAccountController = require('../controllers/userAccountPageController');
const homeController = require('../controllers/homeController');
const loginController = require('../controllers/loginController');
const {checkAuth} = require('../helpers/checkAuth');
const friendsController = require('../controllers/friendsController');

router.get('/', loginController.loadPage);
router.post('/login', loginController.validateLogin);
router.post('/newAccount', loginController.validateNewAccount);
router.get('/logout', loginController.logout);


router.get('/home', checkAuth, homeController.loadPage);
router.post('/addTask', checkAuth, homeController.addTask);
router.post('/editTask', checkAuth, homeController.editTask);
router.post('/deleteTask', checkAuth, homeController.deleteTask);

router.get('/friends', checkAuth, friendsController.loadPage);
router.post('/search', checkAuth, friendsController.search);
router.post('/addFriend', checkAuth, friendsController.addFriend);
router.post('/removeFriend', checkAuth, friendsController.deleteFriendByEmail);

router.get('/account', checkAuth,  userAccountController);


module.exports = router;  


