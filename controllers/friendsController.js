
const fs = require('fs').promises;
const path = require('path');

const sideBar = path.join(__dirname, '../views/sideBar.handlebars');
const DbInteractions = require('../models/dbInteractions.js');
const dbInteractions = new DbInteractions(); 

module.exports = class friendsController {

    static async loadPage(req, res) {
        try {
            const sideBarContent = await fs.readFile(sideBar, 'utf8');
            const userId = req.session.userid;
    
            console.log(userId);
    
            const friendsEmails = await dbInteractions.getUserFriendsEmail(userId);
    
            // Mapeia a lista de e-mails dos amigos para obter os dados dos usuários
            const friendsDataPromises = friendsEmails.map(async (friendEmail) => {
                return await dbInteractions.getUserDataByEmail(friendEmail);
            });
    
            // Aguarda todas as promessas serem resolvidas para obter os dados completos dos amigos
            const friendsData = await Promise.all(friendsDataPromises);
    
            res.render('friendsPage', {
                sideBar: sideBarContent,
                friends: friendsData
            });
        } catch (error) {
            console.error('Erro:', error);
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
    
    static async addFriend(req, res) {
        const userEmailTarget = req.body.userEmail;
        const userId = req.session.userid;

        dbInteractions.addFriend(userId, userEmailTarget);

        res.redirect('/friends');
    }

    static async deleteFriendByEmail(req, res) {
        try {
            const userId = req.session.userid;
            const friendEmail = req.body.userEmail;
            
            console.log("fried: ",friendEmail);

            // Verificar se o e-mail do amigo é válido
            if (!friendEmail) {
                return res.status(400).json({ error: 'O e-mail do amigo é necessário para excluir o amigo.' });
            }
    
            // Verificar se o amigo com o e-mail fornecido existe
            const friendId = await dbInteractions.getUserIdByEmail(friendEmail);
    
            if (!friendId) {
                return res.status(404).json({ error: 'Amigo não encontrado com o e-mail fornecido.' });
            }
    
            // Excluir o amigo
            const deletionResult = await dbInteractions.deleteFriend(userId, friendId);
    
            if (!deletionResult) {
                return res.status(404).json({ error: 'Falha ao excluir o amigo.' });
            }
    
            // Amigo excluído com sucesso
            res.status(200).json({ success: true, message: 'Amigo excluído com sucesso.' });
        } catch (error) {
            console.error('Erro ao excluir amigo:', error);
            res.status(500).json({ error: 'Erro interno do servidor' });
        }
    }
    
    
};
