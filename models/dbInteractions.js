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
                // Usuário não encontrado com o e-mail fornecido
                return  null;
            }
    
            // Assume que o e-mail é único; obtém o primeiro documento retornado
            const userDoc = userQuery.docs[0];
    
            // Verifica se a senha fornecida corresponde à senha armazenada no banco de dados
            const userData = userDoc.data();


            // Senha válida, retorna os dados do usuário e o ID do usuário
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
                tasks.push(doc.data());
            });
            return tasks;
        } catch (error) {
            console.error('Erro ao obter tarefas:', error);
            throw error; 
        }
    }
};

