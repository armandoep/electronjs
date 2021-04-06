//const { ipcRenderer } = require("electron");
const ipc = require('electron').ipcRenderer;
const bcrypt = require('bcrypt')
  
const {getConnection} = require('../database')

let nameSignUp = document.getElementById('nameSignUp');
let usernameSignUp = document.getElementById('usernameSignUp');
let pass = document.getElementById('passwordSignUp');
let submitSignUp = document.getElementById('submitSignUp')

submitSignUp.addEventListener('click', SingUp)



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


async function consultarUsuario(usuario, clave){
  const connection = await getConnection()
  const resultado = await connection.promise().query('SELECT username, password FROM users WHERE username = ?', [usuario])
  

  console.log(resultado)
  return resultado
}

async function SignIn() {
  let username = document.getElementById('usernameSignIn').value;
  let pass = document.getElementById('passwordSignIn').value;

  const match = await consultarUsuario(username, pass)
  console.log(match)
  if (match.length > 0) {
      console.log('success')
      ipc.send('login_valido', [username])
      window.close()
  }else{
      alert("Username or password incorrect")
  }
}

async function SingUp() {
  const connection = await getConnection()
  bcrypt.hash(pass.value, 10).then(pass_hash => {
    connection.promise().query("INSERT INTO users(nombre, username, password) VALUES(?,?,?)", [nameSignUp.value, usernameSignUp.value, pass_hash])
      .then(([results, fields]) => {
        console.log(results);
      })
      .catch((err) => {
        console.log(err);
      });
  }).catch(e => console.log(e))
}