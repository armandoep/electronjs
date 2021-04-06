const { ipcRenderer } = require("electron");
const {getConnection} = require('../database')
let btnAddProduct = document.getElementById('btnAddProduct')
let btnOrders = document.getElementById('btnOrders')
let logOut = document.getElementById('logOut')
let addProveedores = document.getElementById('addProveedores')
let seeProveedores = document.getElementById('seeProveedores')
let addCategories = document.getElementById('addCategorias')
let seeCategories = document.getElementById('seeCategorias')

window.addEventListener('load', renderizarProductos)


addProveedores.addEventListener('click', function() {
    ipcRenderer.send('open_prov')
})


addCategories.addEventListener('click', function() {
    ipcRenderer.send('open_cate')
})


btnAddProduct.addEventListener('click', function() {
    ipcRenderer.send('add_product')
})

btnOrders.addEventListener('click', function() {
    ipcRenderer.send('order_product')
})

ipcRenderer.on('username', (event, args) => {
    document.getElementById('name').innerHTML = args[0]
})

logOut.addEventListener('click', logOutFunc)

function logOutFunc(){
    ipcRenderer.send('logOut')
    window.close()
}


//Consultando productos
const connection = getConnection()

async function consulta() {
    let producto = await connection.promise().query("SELECT * FROM productos")
    .then(([results, fields]) => {
        return results
    }).catch(err => {
        console.log(err)
    })
    
    let listOfProducts = []
    producto.forEach(element => {
        listOfProducts.push(element)
    })
    return listOfProducts
  }

async function categorias(id) {
    let categoria = await connection.promise().query("SELECT * FROM categorias WHERE id = ?", [id])
    .then(([results, fields]) => {
        return results
    }).catch(err => {
        console.log(err)
    })

    return categoria
 }

  //Renderizando Productos
async function renderizarProductos(){
    let productosDiv = document.getElementById('productos')
    let lista = await consulta()

    for(let i = 0; i < lista.length; i++){

        let categoria = await categorias(lista[i].idCategoria)
        let producto = document.createElement('div')
        
        producto.className = "card ml-2" 
        producto.style = "width: 18rem;"

        producto.innerHTML =
            `
                <div class="card-body">
                <h5 class="card-title">${lista[i].nombre}</h5>
                <h6 class="card-subtitle mb-2 text-muted">${categoria[0].nombre}</h6>
                <p class="card-text">${lista[i].descripcion}</p>
                <p class="card-text">Existencia: ${lista[i].existencia}</p>
                <button class="btn btn-primary">Edit</button>
                <button class="btn btn-danger deleteProd">Delete</button>
                </div>
            `

        productosDiv.appendChild(producto)
    }
}

//Borrar producto
async function deleteProduct(id) {
    confirm("Esta seguro de que quiere borrar este producto?")
    let product = await connection.promise().query("DELETE FROM productos WHERE id = ?", [id])
    .then(([results, fields]) => {
        return results
    }).catch(err => {
        console.log(err)
    })

    return product
 }

let btnDelete = document.querySelector(".deleteProd")
btnDelete.addEventListener('click', deleteProduct(this.id))