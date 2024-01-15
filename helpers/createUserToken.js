const jwt = require("jsonwebtoken");

const createUserToken = async (user, req, res) => {
  const token = jwt.sign(
    // payload data
    {
      name: user.userName,
      id: user.userId,
    },
    "nossosecret"
  );

  // return token
  res.status(200).json({
    message: "Você está autenticado!",
    token: token,
    userId: user.userId,
  });
};

module.exports = createUserToken;