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

        if(taskData.for == "you"){
            taskData.for = userId;
        }

        await dbInteractions.addTask(userId, taskData, fomatedCurrentDate);

        res.redirect('/home');
    }

    static async loadPage(req, res) {
        try {
            const userId = req.session.userid;
            const sideBarContent = await fs.readFile(sideBar, 'utf8');

            // Obter e-mails dos amigos
            const friendsEmails = await dbInteractions.getUserFriendsEmail(userId);
    
            // Mapear a lista de e-mails dos amigos para obter os dados dos usuários
            const friendsDataPromises = friendsEmails.map(async (friendEmail) => {
                return await dbInteractions.getUserDataByEmail(friendEmail);
            });
    
            // Aguardar todas as promessas serem resolvidas para obter os dados completos dos amigos
            const friendsData = await Promise.all(friendsDataPromises);
    
            // Obter tarefas do usuário
            const userTasks = await dbInteractions.getTasks(userId);
    
            // Substituir 'created_by' por 'you' se o criador for o próprio usuário
            for (const task of userTasks) {
                if (task.created_by === task.created_for) {
                    task.created_by = "you";
                }
            }
    
            console.log("Amigos:", friendsData);
            console.log("Tarefas e ID:", userTasks);
    
            res.render('tasks', {
                sideBar: sideBarContent, // Certifique-se de definir sideBarContent no escopo
                friends: friendsData,
                userTasks: userTasks
            });
        } catch (error) {
            console.error('Erro ao obter amigos e tarefas:', error);
            res.status(500).json({ error: 'Erro interno do servidor' });
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


