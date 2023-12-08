

module.exports = class UserController {
    static login = (req, res) => {
        res.render('login', { layout: false });
    }

    static validateLogin = async (req, res) => {
        const userData = req.body

        console.log(userData);
        console.log(userData.email);

        console.log(userData.id);

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



