import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import App from './App.jsx'

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCDz9LH4JuYW-fdE5TpgZul4d8dg4iRpRM",
  authDomain: "curso-de-coder-lucio.firebaseapp.com",
  projectId: "curso-de-coder-lucio",
  storageBucket: "curso-de-coder-lucio.firebasestorage.app",
  messagingSenderId: "988257291043",
  appId: "1:988257291043:web:2ddffb88e32841040cda96"
};

// Initialize Firebase
initializeApp(firebaseConfig);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
