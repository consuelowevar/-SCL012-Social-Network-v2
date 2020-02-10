// Este es el punto de entrada de tu aplicacion

// import { myFunction } from './lib/index.js';

// myFunction();

const root = document.getElementById('root'); //seccion imprime contenido
const registerBttn = document.getElementById('registerBttn');

registerBttn.addEventListener('click', () => {

    const loginName = document.getElementById('loginName').value;
    const loginEmail = document.getElementById('loginEmail').value;
    const loginPassword = document.getElementById('loginPassword').value;

    console.log(loginName);
    console.log(loginEmail);
    console.log(loginPassword);

    firebase.auth().createUserWithEmailAndPassword(loginEmail,loginPassword)
    
    .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    console.log(errorCode);
    console.log(errorMessage);
    // ...
  });
});

