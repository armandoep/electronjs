const { ipcRenderer } = require("electron");
const {getConnection} = require('../database')
let btnClose = document.getElementById('btnClose')
let btnAdd = document.getElementById('btnAdd')
let inputName = document.getElementById('inputName')
let inputDescription = document.getElementById('inputDescription')
let selectCategory = document.getElementById('selectCategory')
let inputQuantity = document.getElementById('inputQuantity')

let connection = getConnection()

window.addEventListener('load', loadCategories)
btnAdd.addEventListener('click', addProduct)
btnClose.addEventListener('click', function(){
    window.close()
})


function addProduct() {
    connection.promise().query("INSERT INTO productos(nombre, descripcion, idCategoria, existencia) VALUES (?,?,?,?)", [inputName.value, inputDescription.value, selectCategory.value, inputQuantity.value])
    .then(([results, fields]) => {
        console.log(results);
        alert("Product added successfully")
      })
      .catch((err) => {
        console.log(err);
        alert(err)
      });

      ipcRenderer.send('product_added')
}

async function categories() {
    let categoria = await connection.promise().query("SELECT * FROM categorias")
    .then(([results, fields]) => {
        return results
    }).catch(err => {
        console.log(err)
    })

    return categoria
 }

 async function loadCategories() {
    let categorias = await categories()
    console.log(categorias)

    for (let i = 0; i < categorias.length; i++) {
       let cat = document.createElement("option")
       cat.value = categorias[i].id
       cat.innerHTML = categorias[i].name
       selectCategory.appendChild(cat)
    }
}


