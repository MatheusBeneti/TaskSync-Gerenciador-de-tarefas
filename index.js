
const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

const path = require('path');
const basePath = path.join(__dirname, 'views');

const router = require('./routers/routers');

const exphbs = require('express-handlebars');
const hbs = exphbs.create({ /* configurações opcionais aqui */ });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.static('public'));
app.use(router);
app.use(function(req, res) {res.status(404).sendFile(basePath + '/404.html');})

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});




