const fs = require('fs').promises;
const path = require('path');
// const { db } = require('../models/db.js');
const DbInteractions = require('../models/dbInteractions.js');


const sideBar = path.join(__dirname, '../views/sideBar.handlebars');
const userAccount = path.join(__dirname, '../views/userAccount.handlebars');
const dbInteractions = new DbInteractions(); 



async function main(req, res) {
    try {

        if (!req.session.userid) {
            // Se não estiver autenticado, redirecione para a página de login
            return res.redirect('/login');
        }

        const sideBarContente = await fs.readFile(sideBar, 'utf8');
        const accountContente = await fs.readFile(userAccount, 'utf8');
        
        // Obtém os dados do usuário atual
        const user = await dbInteractions.getUserData(req.session.userid);
        
        // console.log(req.session.userid);
        // const user = await dbInteractions.getUserData(req.session.userid);
        
        res.render('userAccount', {
            sideBar: sideBarContente,
            userAccount: accountContente,
            user: user,
        });
    } catch (erro) {
        console.error('Erro ao renderizar a página:', error);
        res.status(500).send('Erro interno do servidor');
    }
}

module.exports = main;
