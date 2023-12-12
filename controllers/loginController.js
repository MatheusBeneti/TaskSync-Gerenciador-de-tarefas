const DbInteractions = require('../models/dbInteractions.js');
const dbInteractions = new DbInteractions(); 
const bcrypt = require('bcrypt');
const saltRounds = 10;

async function hashPassword(password) {
    try {
      // Generate a salt
      const salt = await bcrypt.genSalt(saltRounds);
  
      // Hash the password with the salt
      const hash = await bcrypt.hash(password, salt);
  
      return hash;
    } catch (error) {
      throw error;
    }
  }
  
  async function verifyPassword(userPassword, storedHash) {
    try {
      // Compare the user-provided password with the stored hash
      const result = await bcrypt.compare(userPassword, storedHash);
  
      return result;
    } catch (error) {
      throw error;
    }
  }


module.exports = class UserController {
    static loadPage = (req, res) => {
        res.render('login', { layout: false });
    }

    static validateLogin = async (req, res) => {
        const userData = req.body;
    
        try {
            const queryResult = await dbInteractions.getUserIdAndPassword(userData.email);
            
            console.log('queryResult:', queryResult);

            if (queryResult == null) {
                console.log('User not found');
                return res.redirect('/');
                // Implementar mensagem de erro no front-end
            }else if(verifyPassword(req.body.password, queryResult.userPassword)) {;

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
        const userData = req.body;
      
        try {

          const hashedPassword = await hashPassword(userData.password);
      
          const userId = await dbInteractions.addNewUser(userData.name, userData.email, hashedPassword);
      
          req.session.userid = userId;
          req.session.save(() => {
            res.redirect('/home');
          });
        } catch (error) {
          console.error('Error:', error);
          res.status(500).send('Internal Server Error');
        }
      };

    static logout = (req, res) => {
        req.session.destroy(() => {
            res.redirect('/')
        })
    }
}



