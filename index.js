
const express = require('express');
const app = express();
const session = require('express-session');

const port = process.env.PORT || 3000;

const path = require('path');
const basePath = path.join(__dirname, 'views');

app.use(session({
  secret: 'suaChaveSecretaAqui',
  resave: false,
  saveUninitialized: true
}));

const router = require('./routers/routers');

const exphbs = require('express-handlebars');
const hbs = exphbs.create({ /* configurações opcionais aqui */ });

// Configura um middleware no Express.js para analisar dados no formato JSON do corpo das solicitações
app.use(express.json());
// Configura um middleware para analisar dados do corpo das solicitações no formato application/x-www-form-urlencoded.
app.use(express.urlencoded({ extended: true }));

// Configura o Express.js para usar o Handlebars.js como mecanismo de visualização
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Configura o Express.js para servir arquivos estáticos, como imagens, CSS e arquivos JavaScript
app.use(express.static('public'));


app.use(router);

app.use(function(req, res) {res.status(404).sendFile(basePath + '/404.html');});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});





