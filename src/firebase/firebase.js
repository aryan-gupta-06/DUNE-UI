import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserSessionPersistence } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyChZpGM_oFNOzbCkuIh4nJOnGgruJYuEgk",
    authDomain: "famvault-9b75c.firebaseapp.com",
    projectId: "famvault-9b75c",
    storageBucket: "famvault-9b75c.firebasestorage.app",
    messagingSenderId: "342279573557",
    appId: "1:342279573557:web:3f17265fe0ad8ef3b8e17c"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Session-based remember me
setPersistence(auth, browserSessionPersistence);
