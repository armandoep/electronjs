//const { ipcRenderer } = require("electron");

const ipc = require('electron').ipcRenderer;

//Validaciones
let pass1 = document.getElementById('passwordSignUp');
let pass2 = document.getElementById('repeatPassword');
let errorMessage = document.getElementById('errorMessage');

pass2.addEventListener('keydown', verificarContraseña);

function verificarContraseña() {
  errorMessage.innerHTML = '';
  if (pass2.value !== pass1.value) {
    errorMessage.innerHTML = 'Password not matching';
    errorMessage.style.color = 'red';
  }
}

let submitSignIn = document.getElementById('submitSignIn');

submitSignIn.addEventListener('click', SignIn);

function SignIn() {
  usernames = ['admin', 'test'];
  passwords = ['admin123', 'test12345'];
  let username = document.getElementById('usernameSignIn').value;
  let pass = document.getElementById('passwordSignIn').value;
  var matchUser = false
  var matchPass = false

  usernames.forEach((element) => {
    if (username == element) {
      matchUser = true
      return matchUser
    } 
  });

  passwords.forEach((element) => {
    if (pass == element) {
      matchPass = true
      return matchPass
    } 
  });

  if (matchUser && matchPass) {
      console.log('success')
      ipc.send('login_valido', [username])
      window.close()
  }else{
      alert("Username or password incorrect")
  }
}
