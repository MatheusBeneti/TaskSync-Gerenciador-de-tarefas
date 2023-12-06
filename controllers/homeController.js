const fs = require('fs').promises;
const path = require('path');

// Caminho do arquivo Handlebars
const sideBar = path.join(__dirname, '../views/sideBar.handlebars');
const inputModal = path.join(__dirname, '../views/inputModal.handlebars');

// Função para ler o conteúdo do arquivo
async function lerArquivo(caminhoDoArquivo) {
    try {
        // Lê o conteúdo do arquivo
        const conteudo = await fs.readFile(caminhoDoArquivo, 'utf8');
        return conteudo;
    } catch (erro) {
        // Em caso de erro, imprime e lança novamente o erro
        console.error(`Erro ao ler o arquivo: ${erro}`);
        throw erro;
    }
}

// Função principal assíncrona
async function main(req, res) {
    try {
        // Lê o conteúdo dos arquivos
        const sideBarContente = await lerArquivo(sideBar);
        const inputModalContent = await lerArquivo(inputModal);

        // Renderiza a view com os conteúdos lidos
        res.render('tasks', {
            sideBar: sideBarContente,
            modal: inputModalContent,
        });
    } catch (erro) {
        // Trata erros aqui
        console.error('Erro:', erro);
        res.status(500).send('Erro interno do servidor');
    }
}

module.exports = main;
