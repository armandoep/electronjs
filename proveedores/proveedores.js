const {getConnection} = require('../database')
let btnClose = document.getElementById('btnClose')
let btnAdd = document.getElementById('btnAdd')
let inputName = document.getElementById('inputName')
let inputNit = document.getElementById('inputNit')
let inputAddress = document.getElementById('inputAddress')

let connection = getConnection()

btnAdd.addEventListener('click', addProv)
btnClose.addEventListener('click', function(){
    window.close()
})

function addProv() {
    connection.promise().query("INSERT INTO proveedores(nombre, nit, direccion) VALUES (?,?,?)", [inputName.value, inputNit.value, inputAddress.value])
    .then(([results, fields]) => {
        console.log(results);
        alert("Provider added successfully")
      })
      .catch((err) => {
        console.log(err);
        alert(err)
      });

}