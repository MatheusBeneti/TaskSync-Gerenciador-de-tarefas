const express = require('express');
const router = express.Router();  

const TaskController = require('../controllers/TaskController');

const path = require('path');
const basePath = path.join(__dirname, '..', 'Templates');

router.get('/', (req, res) => {
    res.sendFile(basePath + '/login.html');
});

router.get('/home', (req, res) => {
    res.sendFile(basePath + '/home.html'); 
});


module.exports = router;  


