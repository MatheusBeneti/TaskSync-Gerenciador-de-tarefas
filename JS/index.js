import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";
import { app, googleProvider } from "/JS/firebase-config.js";

const auth = getAuth(app);
const db = getFirestore(app);
const googleSignUpButton = document.getElementById('googleSignUpBtn');
const googleLoginButton = document.getElementById('googleLoginBtn');

const cadastrarButton = document.getElementById('btnCadastrar');
const entrarButton = document.getElementById('btnEntrar');
const emailLoginInput = document.getElementById('emailLog');
const passwordLoginInput = document.getElementById('passLog');
const nomeInput = document.getElementById('nomeReg');
const emailInput = document.getElementById('emailReg');
const passwordInput = document.getElementById('passReg');


googleSignUpButton.addEventListener('click', () => {
    signInWithGoogle('signup');
});

googleLoginButton.addEventListener('click', () => {
    signInWithGoogle('login');
});

function signInWithGoogle(action) {
    signInWithPopup(auth, googleProvider)
        .then((result) => {
            const user = result.user;
            console.log('Usuário logado com sucesso usando o Google:', user);
            
            // Redirecionar para a página inicial após a autenticação bem-sucedida
            window.location.href = "/HTML/home.html";
        })
        .catch((error) => {
            console.error('Erro ao fazer login com o Google:', error);
        });
}

cadastrarButton.addEventListener('click', () => {
    const nome = nomeInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            const usersRef = collection(db, 'users');
            const newUser = {
                uid: user.uid,
                nome: nome,
                email: email,
                // outras informações que você deseja armazenar
            };

            addDoc(usersRef, newUser)
                .then(() => {
                    console.log('Usuário registrado e adicionado à coleção "users".');
                    window.location.href = "/HTML/home.html";
                })
                .catch((error) => {
                    console.error('Erro ao adicionar usuário à coleção "users":', error);
                })
        })
        .catch((error) => {
            console.error('Erro ao registrar:', error);
        });
});

entrarButton.addEventListener('click', () => {
    const email = emailLoginInput.value;
    const password = passwordLoginInput.value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log('Usuário logado com sucesso:', user);
            window.location.href = "/HTML/home.html";
        })
        .catch((error) => {
            console.error('Erro ao fazer login:', error);
        });
});