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
                return null;
            }

            // Assume que o e-mail é único; obtém o primeiro documento retornado
            const userDoc = userQuery.docs[0];

            // Verifica se a senha fornecida corresponde à senha armazenada no banco de dados
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
                title: taskData.title,
                date: currentDate,
                dueDate: taskData.dueDate,
                priority: taskData.priority,
                description: taskData.description,
                created_for: taskData.for,
                created_by: userId,
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
            const tasksQuery = await db.collection('tasks').where('created_for', '==', userId).get();
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
    
    async updateUser(userId, updatedUser) {
        try {
            const userRef = db.collection('users').doc(userId);
            await userRef.update(updatedUser);
        } catch (error) {
            console.error('Error updating user:', error);
            throw error;
        }
    }
    
    async getUserFriendsEmail(userId) {
        try {
            const userRef = db.collection('users').doc(userId);
            const userDoc = await userRef.get();
    
            if (!userDoc.exists) {
                console.log('Usuário não encontrado com o ID:', userId);
                return [];
            }
    
            const userData = userDoc.data();
    
            // Verifica se userData.friends existe e retorna a lista de amigos ou um array vazio
            const friendsList = userData.friends || [];
    
            console.log('Lista de IDs de amigos do usuário:', friendsList);

            console.log('friend list:', friendsList);
            return friendsList;
        } catch (error) {
            console.error('Erro ao obter amigos:', error);
            throw error;
        }
    }
    
    async getUserDataByEmail(userEmail) {
        try {
            const usersQuery = await db.collection('users').where('email', '==', userEmail).get();
    
            if (usersQuery.empty) {
                console.log('Nenhum usuário encontrado com o e-mail:', userEmail);
                return null;
            }
    
            // Assumindo que o e-mail é exclusivo, pois estamos usando '=='
            const userData = usersQuery.docs[0].data();
    
            // Retorna apenas o nome e o email do usuário
            const { nome, email } = userData;
    
            console.log('Dados do usuário encontrado:', { nome, email });
            return { nome, email };
        } catch (error) {
            console.error('Erro ao obter dados do usuário por e-mail:', error);
            throw error;
        }
    }
    
    async removeFriend(userId, friendId) {
        const userRef = db.collection('users').doc(userId);
    
        try {
            const userDoc = await userRef.get();
    
            if (!userDoc.exists) {
                return null; // Usuário não encontrado
            }
    
            const userData = userDoc.data();
    
    
            // Remove o friendId da lista de amigos
            userData.friends = userData.friends.filter(id => id !== friendId);
    
            // Atualiza o documento sem a necessidade de transação
            await userRef.update({ friends: userData.friends });
    
            const updatedUserDoc = await userRef.get();
            const updatedUserData = updatedUserDoc.data();
            console.log("userData updated: ", updatedUserData);
    
            return true;
        } catch (error) {
            console.error('Erro ao remover amigo:', error);
            throw error;
        }
    }
 
    async getUsersByName(userName) {
        try {
            const usersQuery = await db.collection('users').where('nome', '==', userName).get();
            
            if (usersQuery.empty) {
                // Caso não haja nenhum usuário com o nome fornecido
                console.log('Nenhum usuário encontrado com o nome:', userName);
                return [];
            }
    
            // Se houver usuários com o nome fornecido, criar um novo objeto com informações específicas
            const usersList = usersQuery.docs.map(doc => {
                const userData = doc.data();
                return {
                    name: userData.nome,
                    email: userData.email,
                };
            });
            
            console.log('usersList:', usersList);

            return usersList;
        } catch (error) {
            console.error('Erro ao obter usuários:', error);
            throw error;
        }
    }
    
    async addFriend(userId, friendId) {
        const userRef = db.collection('users').doc(userId);
    
        try {
            await db.runTransaction(async (transaction) => {
                const doc = await transaction.get(userRef);
    
                if (!doc.exists) {
                    return null;
                }
    
                const userData = doc.data();
    
                // Verifica se userData.friends existe e inicializa se necessário
                if (!userData.friends) {
                    userData.friends = [];
                }
    
                if (userData.friends.includes(friendId)) {
                    return null; // Já é amigo, nada a fazer
                }
    
                userData.friends.push(friendId);
                transaction.update(userRef, { friends: userData.friends });
    
                return true;
            });
    
            return true;
        } catch (error) {
            console.error('Erro ao adicionar amigo:', error);
            throw error;
        }
    }
    
    async getUserIdByEmail(email) {
        try {
            const userQuery = await db.collection('users').where('email', '==', email).get();
    
            if (userQuery.empty) {
                return null; // Retorna null se nenhum usuário for encontrado
            }
    
            // Assumindo que o e-mail é exclusivo, pois estamos usando '=='
            return userQuery.docs[0].id;
        } catch (error) {
            console.error('Erro ao obter ID do usuário por e-mail:', error);
            throw error;
        }
    }

    async getUserNameById(userId) {
        try {
            const userDoc = await db.collection('users').doc(userId).get();
    
            if (userDoc.exists) {
                const userData = userDoc.data();
                return userData.nome; 
            } else {
                return null; 
            }
        } catch (error) {
            console.error('Erro ao obter o nome do usuário por ID:', error);
            throw error;
        }
    }
};
