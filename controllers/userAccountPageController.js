const { db } = require('../models/db.js');
const fs = require('fs').promises;
const path = require('path');
const DbInteractions = require('../models/dbInteractions.js');

const sideBar = path.join(__dirname, '../views/sideBar.handlebars');
const dbInteractions = new DbInteractions(); 

async function main(req, res) {
    try {

        const sideBarContent = await fs.readFile(sideBar, 'utf8');
        console.log(req.session.userid);
        const user = await dbInteractions.getUserData(req.session.userid);
   
        res.render('userAccount', {
            sideBar: sideBarContent,
            userName: user.nome,
            userEmail: user.email 
        });

    } catch (error) {
        console.error('Erro:', error);
        res.status(500).send('Erro interno do servidor');
    }
}

module.exports = main;