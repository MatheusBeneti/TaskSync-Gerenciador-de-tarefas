
const firebaseAuthValidator = (req) => {
    // Implemente a lógica de validação no Firebase aqui
    // Retorne true se o usuário estiver autenticado, false caso contrário
    return true;
  };
  
  const checkAuth = (req, res, next) => {
    const isAuthenticated = firebaseAuthValidator(req);
  
    if (isAuthenticated) {
      console.log("Usuário autenticado com sucesso");
      next();
    } else {
      console.log("Usuário não autenticado");
      res.render('login', { layout: false });
    }
  };
  
  module.exports = checkAuth;
  