// updateUserController.js

const { db } = require('../models/db.js');
const DbInteractions = require('../models/dbInteractions.js');

const dbInteractions = new DbInteractions(); 

async function updateUserData(req, res) {
    try {
        // Obtenha os dados atualizados do corpo da solicitação
        const userData = await req.body();

        // Atualize os dados do usuário na coleção "users" no banco de dados
        
        await dbInteractions.updateUserData(req.session.userid, userData, 'users');

    res.status(200).send('Dados do usuário atualizados com sucesso.');
    } catch (error) {
        console.error('Erro ao atualizar dados do usuário:', error);
        res.status(500).send('Erro interno do servidor');
    }
}

module.exports = updateUserData;
