const homeController = require('../controllers/homeController');

module.exports = class UserController {
    static login = (req, res) => {
        res.render('login', { layout: false });
    }

    static validateLogin = async (req, res) => {
        console.log(req.body);
        console.log("efetuando login");
        res.redirect('/home');
    }

    static validateNewAccount = async (req, res) => {
        console.log(req.body);
        console.log("validando nova conta");
        res.redirect('/home');
    }
}



