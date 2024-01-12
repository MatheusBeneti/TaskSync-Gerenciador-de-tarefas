
const fs = require('fs').promises;
const path = require('path');

const sideBar = path.join(__dirname, '../views/sideBar.handlebars');


module.exports = class friendsController {
    static loadFriends(req, res) {  
        
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
