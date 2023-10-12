import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";
import { app } from "/JS/firebase-config.js";


function initFirebase(app) {
  const auth = getAuth(app);
  const db = getFirestore(app);

  // Restante do código que utiliza o auth e db
  const cadastrarButton = document.getElementById('btnCadastrar');
  const entrarButton = document.getElementById('btnEntrar');
  const emailLoginInput = document.getElementById('emailLog');
  const passwordLoginInput = document.getElementById('passLog');
  const nomeInput = document.getElementById('nomeReg');
  const emailInput = document.getElementById('emailReg');
  const passwordInput = document.getElementById('passReg');

  cadastrarButton.addEventListener('click', () => {
      const nome = nomeInput.value;
      const email = emailInput.value;
      const password = passwordInput.value;

      // Criando uma nova conta com email e senha
      createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
              // Lógica após o registro bem-sucedido
              const user = userCredential.user;

              // Adicionando informações do usuário à coleção 'users' no Firestore
              const usersRef = collection(db, 'users');
              const newUser = {
                  uid: user.uid,
                  nome: nome,
                  email: email,
                  // outras informações que você deseja armazenar
              };

              // Adicionando o novo usuário à coleção 'users'
              addDoc(usersRef, newUser)
                  .then(() => {
                      // Usuário adicionado com sucesso à coleção 'users'
                      console.log('Usuário registrado e adicionado à coleção "users".');
                      window.location.href = "/HTML/home.html";
                  })
                  .catch((error) => {
                      // Tratamento de erros ao adicionar usuário à coleção 'users'
                      console.error('Erro ao adicionar usuário à coleção "users":', error);
                  });
          })
          .catch((error) => {
              // Tratamento de erros durante o registro
              const errorCode = error.code;
              const errorMessage = error.message;
              console.error('Erro ao registrar:', errorCode, errorMessage);
          });
  });

  entrarButton.addEventListener('click', () => {
    console.log('Botão Entrar clicado!');
    const email = emailLoginInput.value;
    const password = passwordLoginInput.value;

    // Fazendo login com email e senha
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Lógica após o login bem-sucedido
        const user = userCredential.user;
        console.log('Usuário logado com sucesso:', user);

        // Redirecionar para a página de home após o login bem-sucedido
        window.location.href = "/HTML/home.html";
      })
      .catch((error) => {
        // Tratamento de erros durante o login
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Erro ao fazer login:', errorCode, errorMessage);
      });
  });

}

// Chame a função initFirebase passando a instância do aplicativo como argumento
initFirebase(app);