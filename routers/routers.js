const express = require('express');
const router = express.Router();  

const userAccountController = require('../controllers/userAccountPageController');
const homeController = require('../controllers/homeController');
const loginController = require('../controllers/loginController');
const {checkAuth} = require('../helpers/checkAuth');
const teamsController = require('../controllers/teamsController');
const updateUserController = require('../controllers/updateUserController'); 

router.get('/', loginController.loadPage);
router.post('/login', loginController.validateLogin);
router.post('/newAccount', loginController.validateNewAccount);
router.get('/logout', loginController.logout);


router.get('/home', checkAuth, homeController.loadPage);
router.post('/addTask', checkAuth, homeController.addTask);
router.post('/editTask', checkAuth, homeController.editTask);

router.get('/teams', checkAuth,  teamsController);
// Rota para renderizar a página de conta do usuário
router.get('/account', checkAuth, userAccountController);

// Rota para receber os dados atualizados do usuário
 router.post('/account', checkAuth, updateUserController);


module.exports = router;  


