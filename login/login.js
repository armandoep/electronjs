//const { ipcRenderer } = require("electron");
const ipc = require('electron').ipcRenderer;
  
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
  const resultado = connection.promise().query('SELECT * FROM users WHERE username = ? And password = ?', [usuario, clave])
  .then(([results, fields]) => {
    return results;
  }).catch(err => {
    console.log(err)
  })
  return resultado
}

async function SignIn() {
  let username = document.getElementById('usernameSignIn').value;
  let pass = document.getElementById('passwordSignIn').value;

  const match = await consultarUsuario(username, pass)

  if (match.length > 0) {
      console.log('success')
      ipc.send('login_valido', [username])
      window.close()
  }else{
      alert("Username or password incorrect")
  }
}

function SingUp() {
  connection.promise().query("INSERT INTO users(nombre, username, password) VALUES(?,?,?)", [nameSignUp.value, usernameSignUp.value, pass.value])
    .then(([results, fields]) => {
      console.log(results);
    })
    .catch((err) => {
      console.log(err);
    });
}

  // connection.query('SELECT * FROM users',
  // function(err, results, fields){
  //   console.log(results)
  // })
  