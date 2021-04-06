const {getConnection} = require('../database')
let btnClose = document.getElementById('btnClose')
let btnAdd = document.getElementById('btnAdd')
let inputName = document.getElementById('inputName')
let inputDescription = document.getElementById('inputDescription')

let connection = getConnection()

btnAdd.addEventListener('click', addCat)
btnClose.addEventListener('click', function(){
    window.close()
})

function addCat() {
    connection.promise().query("INSERT INTO categorias(nombre, descripcion) VALUES (?,?)", [inputName.value, inputDescription.value])
    .then(([results, fields]) => {
        console.log(results);
        alert("Categorie added successfully")
      })
      .catch((err) => {
        console.log(err);
        alert(err)
      });

}