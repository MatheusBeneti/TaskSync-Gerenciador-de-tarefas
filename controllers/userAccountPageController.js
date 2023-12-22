const { db } = require('../models/db.js');
const fs = require('fs').promises;
const path = require('path');
const DbInteractions = require('../models/dbInteractions.js');

const sideBar = path.join(__dirname, '../views/sideBar.handlebars');
const dbInteractions = new DbInteractions();

async function main(req, res) {
    try {
        const sideBarContent = await fs.readFile(sideBar, 'utf8');
        console.log(req.session.userid);
        const user = await dbInteractions.getUserData(req.session.userid);

        const userEmpresa = user.empresa || ''; // Pode ser um valor padrão ou uma string vazia
        const userDataNascimento = user.dataNascimento || '';
        const userCelular = user.celular || '';

        res.render('userAccount', {
            sideBar: sideBarContent,
            userName: user.nome,
            userEmail: user.email,
            userEmpresa,
            userDataNascimento,
            userCelular
        });
    } catch (error) {
        console.error('Erro:', error);
        res.status(500).send('Erro interno do servidor');
    }
}

async function updateUserInformation(req, res) {
    try {
        const userId = req.session.userid;
        const { nome, email, celular, empresa, pais, dataNascimento } = req.body;

        // Create an object to store only non-empty fields
        const updatedUser = {};

        // Check and add non-empty fields to the object
        if (nome) updatedUser.nome = nome;
        if (email) updatedUser.email = email;
        if (celular) updatedUser.celular = celular;
        if (empresa) updatedUser.empresa = empresa;
        if (pais) updatedUser.pais = pais;
        if (dataNascimento) updatedUser.dataNascimento = dataNascimento;

        // Update the user with the non-empty fields
        await dbInteractions.updateUser(userId, updatedUser);

        await main(req, res);

    } catch (error) {
        console.error('Erro ao atualizar as informações do usuário:', error);
        res.status(500).send('Erro interno do servidor');
    }
}

module.exports = {
    main,
    updateUserInformation
};