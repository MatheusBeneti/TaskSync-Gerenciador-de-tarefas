const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
    container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
    container.classList.remove("right-panel-active");
});

// No arquivo event-handlers.js

// Função para cadastrar um novo usuário
function cadastrarUsuario() {
    // Obter valores dos campos de entrada
    const nome = document.getElementById('nomeReg').value;
    const email = document.getElementById('emailReg').value;
    const senha = document.getElementById('passReg').value;
  
    // Validar se os campos não estão vazios
    if (!nome || !email || !senha) {
      alert("Por favor, preencha todos os campos.");
      return;
    }
  
    // Criar usuário no Firebase
    firebase.auth().createUserWithEmailAndPassword(email, senha)
    .then((userCredential) => {
        // Registro bem-sucedido, agora você pode adicionar o nome ao perfil do usuário
        return userCredential.user.updateProfile({
          displayName: nome
        })
        .then(() => {
          // Adicione informações do usuário à coleção "users" no Firestore
          const db = firebase.firestore();
          const userId = userCredential.user.uid;
          const usersRef = db.collection("users").doc(userId);
          
          return usersRef.set({
            nome: nome,
            email: email
          })
          .then(() => {
            // Usuário cadastrado com sucesso
            console.log("Usuário cadastrado com sucesso!");
            window.location.href = "home.html";
          });
        });
      })      
      .catch((error) => {
        // Trate os erros aqui
        console.error("Erro ao cadastrar usuário:", error.message);
      });
  }
  
  // Adicione um evento de clique ao botão de cadastro
  const btnCadastrar = document.getElementById('btnCadastrar');
  btnCadastrar.addEventListener('click', cadastrarUsuario);
  


document.getElementById("entrar").addEventListener("click", function() {
    var email = document.getElementById("emailLog").value;
    var password = document.getElementById("passLog").value;

    signInWithEmailAndPassword(auth, email, password)
        .then(function(userCredential) {
            // Usuário autenticado com sucesso
            console.log("Usuário autenticado:", userCredential.user);
            window.location.href = "home.html"; // Redirecionar para home.html após o login
        })
        .catch(function(error) {
            // Lidar com erros aqui.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.error(errorCode, errorMessage);
        });
});

