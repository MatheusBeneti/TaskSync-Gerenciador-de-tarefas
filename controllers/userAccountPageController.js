
const userAccountController = (req, res) => {
    const user = {
        name: 'John',
        surname: 'Johnnom',
    };
    // função para obter dados do banco
    res.render('userAccount', { user: user });
};

module.exports = userAccountController;

    
