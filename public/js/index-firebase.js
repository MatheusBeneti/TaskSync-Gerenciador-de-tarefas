import { app, googleProvider } from "../models/db.js";

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
            const usersRef = collection(db, 'users');
            const userQuery = query(usersRef, where('uid', '==', user.uid));

            getDocs(userQuery)
                .then((querySnapshot) => {
                    if (querySnapshot.empty) {
                        // O usuário não existe no Firestore, então adicionamos
                        const newUser = {
                            uid: user.uid,
                            nome: user.displayName,
                            email: user.email,
                            // outras informações que você deseja armazenar, se disponíveis
                        };

                        addDoc(usersRef, newUser)
                            .then(() => {
                                console.log('Usuário registrado e adicionado à coleção "users".');
                                if (action === 'signup') {
                                    window.location.href = "/home";
                                }
                            })
                            .catch((error) => {
                                console.error('Erro ao adicionar usuário à coleção "users":', error);
                            });
                    } else {
                        // O usuário já existe no Firestore, redirecione para a página inicial
                        console.log('Usuário já existe na coleção "users".');
                        if (action === 'login') {
                            window.location.href = "/home";
                        }
                    }
                })
                .catch((error) => {
                    console.error('Erro ao verificar a existência do usuário:', error);
                });
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
                    window.location.href = "/home";
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
            window.location.href = "/home";
        })
        .catch((error) => {
            console.error('Erro ao fazer login:', error);
        });
});
