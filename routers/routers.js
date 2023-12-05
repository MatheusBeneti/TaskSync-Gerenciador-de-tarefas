const express = require('express');
const router = express.Router();  

const userAccountController = require('../controllers/userAccountPageController');

const path = require('path');
const basePath = path.join(__dirname, '..', 'views');

router.get('/', (req, res) => {
    res.sendFile(basePath + '/login.html');
});

//router.get('/', chamarFunction) 

router.get('/home', (req, res) => {
    res.sendFile(basePath + '/home.html'); 
});

router.get('/account', userAccountController);


module.exports = router;  


