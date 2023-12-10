const fs = require('fs').promises;
const path = require('path');


const sideBar = path.join(__dirname, '../views/sideBar.handlebars');

module.exports = class homePage  {
    static async addTask (req, res, next) {

    }

    static async loadPage (req, res) {
        try {
            const sideBarContente = await fs.readFile(sideBar, 'utf8');
    
            res.render('tasks', {
                sideBar: sideBarContente
            });
        } catch (erro) {
            console.error('Erro:', erro);
            res.status(500).send('Erro interno do servidor');
        }
    }

}


