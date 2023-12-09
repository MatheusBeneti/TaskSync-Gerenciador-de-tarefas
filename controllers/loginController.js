const DbInteractions = require('../models/dbInteractions.js');
const dbInteractions = new DbInteractions(); 


module.exports = class UserController {
    static login = (req, res) => {
        res.render('login', { layout: false });
    }

    static validateLogin = async (req, res) => {
        const userData = req.body

        // auth user
        req.session.userid = userData.email
        req.session.save(() => {
            res.redirect('/home')
        })

    }

    static validateNewAccount = async (req, res) => {
        const userData = req.body
 
        const userId = await dbInteractions.addNewUser(userData.name, userData.email, userData.password);

        req.session.userid = userId;
        req.session.save(() => {
            res.redirect('/home')
        })
    }
}



