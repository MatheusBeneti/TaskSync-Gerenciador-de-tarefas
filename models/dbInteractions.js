const { db } = require("./db.js");

module.exports = class dbInteractions {
    async getUserData(userId) {
        const userRef = db.collection('users').doc(userId);
        const doc = await userRef.get();
        if (!doc.exists) {
            return null;
        }
        return doc.data();
    }

    async getUserIdAndPassword(email) {
      try {
            // Consulta o banco de dados para encontrar o usuário com o e-mail fornecido
            const userQuery = await db.collection('users').where('email', '==', email).get();
    
            if (userQuery.empty) {
                return  null;
            }
    
            // Assume que o e-mail é único; obtém o primeiro documento retornado
            const userDoc = userQuery.docs[0];
    

            const userData = userDoc.data();

            return { userId: userDoc.id, userPassword: userData.password };

      } catch (error) {
          console.error('Erro ao obter dados do usuário por e-mail: ', error);
          return { exists: false, userId: null };
      }
    }
  
    async addNewUser(name, email, password) {
        try {
            const novoUsuario = {
                nome: name,
                email: email,
                password: password,
            };
        
            const docRef = await db.collection('users').add(novoUsuario);
        
            // Retorna o ID do documento recém-adicionado
            return docRef.id;
        } catch (error) {
            console.error('Erro ao adicionar usuário:', error);
            throw error; 
        }
    }

    async addTask(userId, taskData, currentDate) {
        try {
            const task = {
                userId: userId,
                title: taskData.title,
                date: currentDate,
                dueDate: taskData.dueDate,
                priority: taskData.priority,
                description: taskData.description
            };
        
            const docRef = await db.collection('tasks').add(task);
        
            // Retorna o ID do documento recém-adicionado
            return docRef.id;
        } catch (error) {
            console.error('Erro ao adicionar tarefa:', error);
            throw error; 
        }
    }

    async getTasks(userId) {
        try {
            const tasksQuery = await db.collection('tasks').where('userId', '==', userId).get();
            const tasks = [];
            tasksQuery.forEach(doc => {
                // Adiciona o id do documento como parte dos dados da tarefa
                const taskData = doc.data();
                taskData.taskId = doc.id;
                tasks.push(taskData);
            });
            return tasks;
        } catch (error) {
            console.error('Erro ao obter tarefas:', error);
            throw error;
        }
    }

    async deleteTask(taskId) {
        try {
            const task = await db.collection('tasks').doc(taskId);
            await task.delete();
        } catch (error) {
            console.error('Erro ao excluir a tarefa:', error);
            throw error; 
        }
    }
    

    async getUserFriends(){
        try {
            const friendsQuery = await db.collection('users').where('friends', '==', true).get();
            const friends = [];
            friendsQuery.forEach(doc => {
                // Adiciona o id do documento como parte dos dados da tarefa
                const friendData = doc.data();
                friendData.friendId = doc.id;
                friends.push(friendData);
            });
            return friends;
        } catch (error) {
            console.error('Erro ao obter amigos:', error);
            throw error;
        }
    }

    async addFriend(userId, friendId) {
        try {
            const userRef = db.collection('users').doc(userId);
            const doc = await userRef.get();
            if (!doc.exists) {
                return null;
            }
            const userData = doc.data();
            if (userData.friends.includes(friendId)) {
                return null;
            }
            userData.friends.push(friendId);
            await userRef.update({ friends: userData.friends });
            return true;
        } catch (error) {
            console.error('Erro ao adicionar amigo:', error);
            throw error; 
        }
    }
};

