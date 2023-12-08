


module.exports = class UserController {
    static login = (req, res) => {
        res.render('loginTest', { layout: false });
    }
    
    static post = (req, res) => {
        console.log(req.body);
        console.log("passei por aqui");
        //res.render('login', { layout: false });
    }
}


