const fs = require('fs').promises;
const path = require('path');


const sideBar = path.join(__dirname, '../views/sideBar.handlebars');
const userAccount = path.join(__dirname, '../views/userAccount.handlebars');



async function main(req, res) {
    try {
        const sideBarContente = await fs.readFile(sideBar, 'utf8');
        const accountContente = await fs.readFile(userAccount, 'utf8');

        res.render('userAccount', {
            sideBar: sideBarContente,
            userAccount: accountContente,
        });
    } catch (erro) {
        console.error('Erro:', erro);
        res.status(500).send('Erro interno do servidor');
    }
}

module.exports = main;
