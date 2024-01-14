
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
                friends: friends
            });
        }catch(error){
            error => console.error('Erro ao carregar amigos: ', error);
        };
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

    static async search(req, res) {
        try {
            console.log(req.body.search);
            const sideBarContent = await fs.readFile(sideBar, 'utf8');
            const userName = req.body.search;
    
            const usersFound = await dbInteractions.getUsersByName(userName);
    
            res.render('friendsPage', {
                usersFound: usersFound,
                sideBar: sideBarContent
            });
        } catch (error) {
            console.error('Erro na busca de usuários:', error);
            res.status(500).send('Erro na busca de usuários');
        }
    }
    
};
