const { db } = require('../models/db.js');
const fs = require('fs').promises;
const path = require('path');

const sideBar = path.join(__dirname, '../views/sideBar.handlebars');

async function main(req, res) {
    try {

        const sideBarContent = await fs.readFile(sideBar, 'utf8');

        const userRef = db.collection('users').doc('F3byfZV1WuiopqrgK2wL');
        const doc = await userRef.get();
        if(!doc.exists){
            return res.sendStatus(400)
        }

        //res.status(200).send(doc.data())
   
        res.render('userAccount', {
            sideBar: sideBarContent,
            userName: doc.data().nome,
            userEmail: doc.data().email // Se não há autenticação, definimos user como null
        });
    } catch (error) {
        console.error('Erro:', error);
        res.status(500).send('Erro interno do servidor');
    }
}

module.exports = main;