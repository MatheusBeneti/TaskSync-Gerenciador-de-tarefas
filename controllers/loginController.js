const homeController = require('../controllers/homeController');

module.exports = class UserController {
    static login = (req, res) => {
        res.render('login', { layout: false });
    }

    static validateLogin = async (req, res) => {
        const userData = req.body

        console.log(userData);
        console.log(userData.name);

        console.log("efetuando login");
        res.redirect('/home');
    }

    static validateNewAccount = async (req, res) => {
        const userData = req.body

        console.log(userData);
        console.log(userData.name);
 
        console.log("validando nova conta");
        res.redirect('/home');
    }
}



