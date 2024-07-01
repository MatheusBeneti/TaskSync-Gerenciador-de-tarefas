const DbInteractions = require('../models/dbInteractions.js');
const dbInteractions = new DbInteractions(); 
const crypto = require('crypto');

function verifyPassword(password, storedPassword) {
    return password === storedPassword;
}

module.exports = class UserController {
    static loadPage = (req, res) => {
        console.log('Loading login page');
        res.render('login', { layout: false });
    }

    static validateLogin = async (req, res) => {
        const userData = req.body;
        console.log('Validating login for:', userData.email);

        try {
            const queryResult = await dbInteractions.getUserIdAndPassword(userData.email);
            console.log('Query result:', queryResult);

            if (!queryResult) {
                console.log('User not found');
                return res.redirect('/');
            }

            const passwordMatch = verifyPassword(userData.password, queryResult.userPassword);
            console.log('Password match:', passwordMatch);

            if (passwordMatch) {
                req.session.userid = queryResult.userId;
                console.log('User ID set in session:', req.session.userid);
                req.session.save(() => {
                    res.redirect('/home');
                });
            } else {
                console.log('Incorrect password');
                res.redirect('/');
            }

        } catch (error) {
            console.error('Error during login validation:', error);
            res.status(500).send('Internal Server Error');
        }
    };

    static validateNewAccount = async (req, res) => {
        const userData = req.body;
        console.log('Validating new account for:', userData.email);

        try {
            const queryResult = await dbInteractions.getUserIdAndPassword(userData.email);
            console.log('Query result:', queryResult);

            if (queryResult !== null) {
                res.redirect('/');
                console.log('User exists');
            } else {
                const userId = await dbInteractions.addNewUser(userData.name, userData.email, userData.password);
                console.log('New user ID:', userId);

                req.session.userid = userId;
                console.log('User ID set in session:', req.session.userid);
                req.session.save(() => {
                    res.redirect('/home');
                });
            }
        } catch (error) {
            console.error('Error during account validation:', error);
            res.status(500).send('Internal Server Error');
        }
    };

    static logout = (req, res) => {
        console.log('Logging out user:', req.session.userid);
        req.session.destroy(() => {
            res.redirect('/');
        });
    }
}
