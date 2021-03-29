const {getConnection} = require('../database')
let btnClose = document.getElementById('btnClose')
let btnAdd = document.getElementById('btnAdd')
let selectProduct = document.getElementById('selectProduct')
let selectProvider = document.getElementById('selectProvider')
let inputQuantity = document.getElementById('inputQuantity')

let connection = getConnection()

btnAdd.addEventListener('click', addOrder)
window.addEventListener('load', loadProductos)
window.addEventListener('load', loadProveedores)

function addOrder() {
    connection.promise().query("INSERT INTO pedidos(idUsuario, idProveedor, idProducto, cantidad) VALUES (?,?,?,?)", [1, selectProvider.value, selectProduct.value, inputQuantity.value])
    .then(([results, fields]) => {
        console.log(results);
        alert("Provider added successfully")
      })
      .catch((err) => {
        console.log(err);
        alert(err)
      });
}

btnClose.addEventListener('click', function(){
    window.close()
})


async function searchProveedor() {
    let proveedor = await connection.promise().query("SELECT * FROM proveedores")
    .then(([results, fields]) => {
        return results
    }).catch(err => {
        console.log(err)
    })

    return proveedor
 }

 async function loadProveedores() {
    let proveedor = await searchProveedor()
    console.log(proveedor)

    for (let i = 0; i < proveedor.length; i++) {
       let prov = document.createElement("option")
       prov.value = proveedor[i].id
       prov.innerHTML = proveedor[i].nombre
       selectProvider.appendChild(prov)
    }
}

async function searchProducto() {
    let producto = await connection.promise().query("SELECT * FROM productos")
    .then(([results, fields]) => {
        return results
    }).catch(err => {
        console.log(err)
    })

    return producto
 }

 async function loadProductos() {
    let producto = await searchProducto()
    console.log(producto)

    for (let i = 0; i < producto.length; i++) {
       let prod = document.createElement("option")
       prod.value = producto[i].id
       prod.innerHTML = producto[i].nombre
       selectProduct.appendChild(prod)
    }
}