import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
        import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";
        import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";
        

        const firebaseConfig = {
            apiKey: "AIzaSyCo2qHQFVgeOkiov_YYhbMwTNuNBDmBIJI",
            authDomain: "tasksync-f34ef.firebaseapp.com",
          projectId: "tasksync-f34ef",
          storageBucket: "tasksync-f34ef.appspot.com",
          messagingSenderId: "1062196322321",
          appId: "1:1062196322321:web:d6a6ec92f8f713ba3251b0",
          measurementId: "G-3QL6W2WBKB"
        };

        // Inicializando o app do Firebase
        export const app = initializeApp(firebaseConfig);
        export const auth = getAuth(app);
        export const db = getFirestore(app);
        export const googleProvider = new GoogleAuthProvider();