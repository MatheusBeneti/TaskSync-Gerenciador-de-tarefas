const fs = require('fs').promises;
const path = require('path');
const DbInteractions = require('../models/dbInteractions.js');
const dbInteractions = new DbInteractions(); 

const moment = require('moment');
const { get } = require('http');

function formatarData(date) {
  return moment(date).format('YYYY-MM-DD');
}

const sideBar = path.join(__dirname, '../views/sideBar.handlebars');

module.exports = class homePage  {
    
    static async addTask (req, res) {
        const currentDate = new Date();
        const fomatedCurrentDate = formatarData(currentDate);
        const taskData = req.body;

        const userId = req.session.userid;

        await dbInteractions.addTask(userId, taskData, fomatedCurrentDate);

        res.redirect('/home');
    }

    static async loadPage (req, res) {
        try {
            const sideBarContent = await fs.readFile(sideBar, 'utf8');
            const userId = req.session.userid;

            const userTasks =  await dbInteractions.getTasks(userId);

            

            console.log("Tarefas e id ", userTasks);

            res.render('tasks', {
               sideBar: sideBarContent,
               userTasks: userTasks
            });
        } catch (erro) {
            console.error('Erro:', erro);
            res.status(500).send('Erro interno do servidor');
        }
    }

    static async editTask (req, res) {
        const task = req.body;
        console.log("essa é a task do html: ", task);
        try {
            console.log('entrou');
            //implementar função para editar tarefa
        }catch (error) {
            console.error('Erro ao tentar alterar uma tarefa: ', error);
        }
    }

    static async deleteTask(req, res) {
        try {
            const taskId = req.body.taskId;
    
            await dbInteractions.deleteTask(taskId);
    
            res.status(200).redirect('/home');
        } catch (error) {
            console.error(error);
            res.status(404).send('Erro ao excluir a tarefa');
        }
    }
    
}


