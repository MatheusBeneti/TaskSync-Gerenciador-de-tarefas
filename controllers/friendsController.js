
const fs = require('fs').promises;
const path = require('path');

const sideBar = path.join(__dirname, '../views/sideBar.handlebars');
const DbInteractions = require('../models/dbInteractions.js');
const dbInteractions = new DbInteractions(); 

module.exports = class friendsController {
    static async loadFriends(req, res) {  
        try{
            const friends = dbInteractions.getUserFriends;
            res.render('friendsPage', {
                'friends': friends
            });
        }catch(error){
            error => console.error('Erro ao carregar amigos: ', error);
        };
        
        const friends = dbInteractions.getUserFriends;

    }

    static async loadPage(req, res) {
        try {
            const sideBarContent = await fs.readFile(sideBar, 'utf8');
    
            res.render('friendsPage', {
                sideBar: sideBarContent,
            });
        } catch (erro) {
            console.error('Erro:', erro);
            res.status(500).send('Erro interno do servidor');
        }
    }
};
