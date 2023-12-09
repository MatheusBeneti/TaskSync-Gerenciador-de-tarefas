const DbInteractions = require('../models/dbInteractions.js');
const dbInteractions = new DbInteractions(); 


module.exports = class UserController {
    static login = (req, res) => {
        res.render('login', { layout: false });
    }

    static validateLogin = async (req, res) => {
        const userData = req.body;
    
        try {
            const queryResult = await dbInteractions.getUserDataAndCheckExistence(userData.email, userData.password);
            
            console.log('queryResult:', queryResult);

            if (!queryResult.exists) {
                console.log('User not found');
                return res.redirect('/');
                // Implementar mensagem de erro no front-end
            }else{
                // Auth user
                req.session.userid = queryResult.userId;
                req.session.save(() => {
                    res.redirect('/home');
                });
            }
    
        } catch (error) {
            console.error('Error during login validation:', error);
            res.status(500).send('Internal Server Error');
        }
    }
    

    static validateNewAccount = async (req, res) => {
        const userData = req.body
 
        const userId = await dbInteractions.addNewUser(userData.name, userData.email, userData.password);

        req.session.userid = userId;
        req.session.save(() => {
            res.redirect('/home')
        })
    }

    static logout = (req, res) => {
        req.session.destroy(() => {
            res.redirect('/')
        })
    }
}



