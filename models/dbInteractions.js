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
}
