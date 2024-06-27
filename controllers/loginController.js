const DbInteractions = require('../models/dbInteractions.js');
const dbInteractions = new DbInteractions(); 
const crypto = require('crypto');

function hashPassword(password) {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    return {
        salt: salt,
        hash: hash
    };
}

function verifyPassword(password, storedHash, storedSalt) {
    const hash = crypto.pbkdf2Sync(password, storedSalt, 1000, 64, 'sha512').toString('hex');
    return hash === storedHash;
}

module.exports = class UserController {
    static loadPage = (req, res) => {
        res.render('login', { layout: false });
    }

    static validateLogin = async (req, res) => {
        const userData = req.body;

        try {
            const queryResult = await dbInteractions.getUserIdAndPassword(userData.email);

            if (!queryResult) {
                console.log('User not found');
                return res.redirect('/');
            }

            const passwordMatch = verifyPassword(userData.password, queryResult.userPassword, queryResult.salt);

            if (passwordMatch) {
                req.session.userid = queryResult.userId;
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

        try {
            const queryResult = await dbInteractions.getUserIdAndPassword(userData.email);

            if (queryResult !== null) {
                res.redirect('/');
                console.log('User exists');
            } else {
                const { salt, hash } = hashPassword(userData.password);
                const userId = await dbInteractions.addNewUser(userData.name, userData.email, hash, salt);

                req.session.userid = userId;
                req.session.save(() => {
                    res.redirect('/home');
                });
            }
        } catch (error) {
            console.error('Error:', error);
            res.status(500).send('Internal Server Error');
        }
    };

    static logout = (req, res) => {
        req.session.destroy(() => {
            res.redirect('/');
        });
    }
}
