const { ipcRenderer } = require("electron");
let btnAddProduct = document.getElementById('btnAddProduct')
let btnOrders = document.getElementById('btnOrders')

btnAddProduct.addEventListener('click', function() {
    ipcRenderer.send('add_product')
})

btnOrders.addEventListener('click', function() {
    ipcRenderer.send('order_product')
})

ipcRenderer.on('username', (event, args) => {
    document.getElementById('name').innerHTML = args[0]
})