const fs = require('fs').promises;
const path = require('path');
const DbInteractions = require('../models/dbInteractions.js');
const dbInteractions = new DbInteractions(); 


const sideBar = path.join(__dirname, '../views/sideBar.handlebars');

module.exports = class homePage  {
    static async addTask (req, res) {
        const currentDate = new Date();
        const taskData = req.body;
        console.log(taskData.due);
        const userId = '12342' //req.session.userid;

        await dbInteractions.addTask(userId, taskData, currentDate);

        res.redirect('/home');
    }

    static async loadPage (req, res) {
        try {
            const sideBarContent = await fs.readFile(sideBar, 'utf8');
            
            const userTasks =  await dbInteractions.getTasks('12342' /*req.session.userid*/);

            // Renderizar a página, passando a string JSON como parte do contexto
            res.render('tasks', {
               sideBar: sideBarContent,
               userTasks: userTasks
            });
        } catch (erro) {
            console.error('Erro:', erro);
            res.status(500).send('Erro interno do servidor');
        }
    }

}


