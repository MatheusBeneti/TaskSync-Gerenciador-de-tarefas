const { db } = require('../models/db.js');
const fs = require('fs').promises;
const path = require('path');
const DbInteractions = require('../models/dbInteractions.js');

const sideBar = path.join(__dirname, '../views/sideBar.handlebars');
const dbInteractions = new DbInteractions(); // Crie uma instância da classe

async function main(req, res) {
    try {

        const sideBarContent = await fs.readFile(sideBar, 'utf8');

        const user = await dbInteractions.getUserData('F3byfZV1WuiopqrgK2wL');
   
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