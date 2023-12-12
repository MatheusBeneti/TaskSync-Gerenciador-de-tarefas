const fs = require('fs').promises;
const path = require('path');
const DbInteractions = require('../models/dbInteractions.js');
const dbInteractions = new DbInteractions(); 

const moment = require('moment');

function formatarData(date) {
  return moment(date).format('YYYY-MM-DD');
}

const dataAtual = new Date();
const dataFormatada = formatarData(dataAtual);


const sideBar = path.join(__dirname, '../views/sideBar.handlebars');

module.exports = class homePage  {
    
    static async addTask (req, res) {
        const currentDate = new Date();
        const fomatedCurrentDate = formatarData(currentDate);
        const taskData = req.body;

        const userId = req.session.userid;

        console.log('testeeeeeeeeeeeeeeeeeee');
        console.log('data atual: ' + fomatedCurrentDate);

        await dbInteractions.addTask(userId, taskData, fomatedCurrentDate);

        res.redirect('/home');
    }

    static async loadPage (req, res) {
        try {
            const sideBarContent = await fs.readFile(sideBar, 'utf8');
            const userId = req.session.userid;

            const userTasks =  await dbInteractions.getTasks(userId);

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


