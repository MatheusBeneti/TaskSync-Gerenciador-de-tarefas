
const userAccountController = (req, res) => {
    const user = {
        name: 'John',
        surname: 'Johnnom',
    };

    res.render('userAccount', { layout: 'userAccountLayout', user: user });
};

module.exports = userAccountController;

    
