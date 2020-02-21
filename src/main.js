//      REGISTRO USUARIO NUEVO  
const loginForm = document.getElementById('loginForm');
// function loginView () {
loginForm.innerHTML = `
<form id="signupForm">
<h2>REGISTRO NUEVO USUARIO</h2>
<input type="name" class="inputLog" id="nameRegister" placeholder="Nombre">
<input type="email" class="inputLog" id="emailRegister" placeholder="Email">
<input type="password" class="inputLog" id="passRegister" placeholder="Contraseña">

<button type="button" class="buttonLog" id="buttonRegister">Registrarme</button>
<button type="button" class="buttonLog" id="buttonLogin2">Iniciar Sesión</button>
</form>
`
document.getElementById('buttonRegister').addEventListener('click',createUser);
document.getElementById('buttonLogin2').addEventListener('click', loginUser);
// }


function createUser() {
    const emailRegister = document.getElementById('emailRegister').value;
    const passRegister = document.getElementById('passRegister').value;

    firebase.auth().createUserWithEmailAndPassword(emailRegister, passRegister)
    .then(() => {
        emailVerification()
    })
    .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        alert('Debe completar todos los campos');
        console.log(errorCode);
        console.log(errorMessage);
    });
}

// const buttonRegister = document.getElementById ('buttonRegister');
// buttonRegister.addEventListener('click', () => {
//     const emailRegister = document.getElementById('emailRegister').value;
//     const passRegister = document.getElementById('passRegister').value;

//     const  createUser = (emailRegister, passRegister) => { 
//         firebase.auth().createUserWithEmailAndPassword(emailRegister, passRegister)
//         .then(function(){
//          emailVerification()
//      })
//     .catch(function(error) {
//     // Handle Errors here.
//         const errorCode = error.code;
//         const errorMessage = error.message;
//         alert('Tú Email no a sido verificado');
//         console.log(errorCode);
//         console.log(errorMessage);
//    });

//     };
//     console.log(emailRegister);
//     console.log(passRegister);
//     createUser();

// });

//  VERIFICACION X CORREO , SI SE HA REGISTRADO CORRECTAMENTE
function emailVerification () {
    const user = firebase.auth().currentUser;
    alert('Revisa tu correo');
    console.log(user);
    user.sendEmailVerification()
      .then(() => {
        // Email sent.
        alert('Se ha enviado un correo de verificación para activar su cuenta');
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
}

//      INICIO SESION USUARIO

function loginUser(){
    loginForm.innerHTML = `
    <form>
    <h2>INICIO USUARIO</h2>
    <input type="email" class="inputLog" id="emailLogin" placeholder="Email">
    <input type="password" class="inputLog" id="passwordLogin" placeholder="Contraseña">
    
    <button type="submit" class="buttonLog" id="buttonLogin">Iniciar Sesión</button>
    <button type="button" class="buttonLog" id="buttonGoogle">Ingresa con Google</button>
    <button type="button" class="buttonLog" id="createAccount">Crear Cuenta</button>
  </form> 
    `
    document.getElementById('buttonLogin').addEventListener('click', loginAuth, postView );
    document.getElementById('buttonGoogle').addEventListener('click', loginGoogle);
}    
    function loginAuth (){
        const emailLogin = document.getElementById('emailLogin').value;
        const passwordLogin = document.getElementById('passwordLogin').value;
        console.log(emailLogin);
        console.log(passwordLogin);
        firebase.auth().signInWithEmailAndPassword(emailLogin, passwordLogin)
        .then((postView) => {
        postView();
        alert('iniciaste sesion');
        
        
    }) 
    //Catch se ejecuta cuando hay algun error en la autentificación
    .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
    });
}

 function loginGoogle (){
    
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
    .then((result) => {
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
      }).catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
}


function observador () {
     firebase.auth().onAuthStateChanged(function(user) {
         //si existe un usuario se ejecutara todo esto 
         if (user) {
    postView();
      console.log('existe usuario activo')
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;
              // ...
    } else {
    console.log('no existe usuario activo')
    }
 });      
}
observador();

const printPost = document.getElementById('printPost');
function postView(){
    loginForm.innerHTML = `
    <input type="text" id="nameUser" placeholder="Nombre">
    <input type="text" id="post" placeholder="tu post aqui">
    <button type="button" id="sendPost">Publicar</button>
    `
    document.getElementById('sendPost').addEventListener('click',createPost);
}

const db = firebase.firestore();

function createPost () {
const name = document.getElementById('nameUser').value;
const post = document.getElementById('post').value;
    db.collection("posts").add({
        user : name,
        post : post,
    }) 
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
        document.getElementById('nameUser').value = ''; 
        document.getElementById('post').value = '';
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
}


const post = document.getElementById('printPost');
db.collection("posts").onSnapshot((querySnapshot) => {
    printPost.innerHTML = '';
    querySnapshot.forEach((doc) => {
     console.log(`${doc.id} => ${doc.data().post}`);
        printPost.innerHTML += `
            <div>
            <textarea id="print_Post" >${doc.data().post}</textarea>
            </div>
            
            `
    });
});

// db.collection("users").get()
// .then((querySnapshot) => {
//   querySnapshot.forEach((doc) => {
//       console.log(`${doc.id} => ${doc.data()}`);
//   });
// });