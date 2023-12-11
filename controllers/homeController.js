const fs = require('fs').promises;
const path = require('path');
const DbInteractions = require('../models/dbInteractions.js');
const dbInteractions = new DbInteractions(); 


const sideBar = path.join(__dirname, '../views/sideBar.handlebars');

module.exports = class homePage  {
    static async addTask (req, res) {
        const currentDate = new Date();
        const taskData = req.body;
        const userId = '12342' //req.session.userid;

        await dbInteractions.addTask(userId, taskData, currentDate);

        res.redirect('/home');
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


