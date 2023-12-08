

module.exports = class UserController {
    static login = (req, res) => {
        res.render('login', { layout: false });
    }

    static validateLogin = async (req, res) => {
        const userData = req.body

        console.log(userData);
        console.log(userData.email);

        console.log(userData.id);


        const usuariosCollection = db.collection('usuarios');

        // Dados que você deseja adicionar
        const novoUsuario = {
        nome: 'João',
        idade: 25,
        email: 'joao@example.com'
        };

        // Adicionando o documento à coleção
        usuariosCollection.add(novoUsuario)
        .then(docRef => {
            console.log('Documento adicionado com ID:', docRef.id);
        })
        .catch(error => {
            console.error('Erro ao adicionar documento:', error);
        });


        // auth user
        req.session.userid = userData.email

        req.session.save(() => {
            res.redirect('/home')
        })

    }

    static validateNewAccount = async (req, res) => {
        const userData = req.body

        console.log(userData);
        console.log(userData.name);
 
        console.log("validando nova conta");
        res.redirect('/home');
    }
}



