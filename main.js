const { app, BrowserWindow, ipcMain } = require('electron')
//const mysql = require('mysql2')

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.loadFile('./login/login.html')
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

let productos;
function ventanaProductos() { 
    productos = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    })

    productos.loadFile('./productos/productos.html')
 }

 ipcMain.on('login_valido', (event, args) => {
    ventanaProductos()
    productos.webContents.on('did-finish-load', () => {
       productos.webContents.send('username', args)
    })
})

ipcMain.on('logOut', (event, args) => {
  createWindow()
})


let agregar;
function ventanaAddProductos() { 
    agregar = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    })

    agregar.loadFile('./productos/agregarProductos.html')
 }

 ipcMain.on('add_product', (event, args) => {
    ventanaAddProductos()
})

let order;
function ventanaOrdenarProductos() { 
    order = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    })

    order.loadFile('./ordenes/order.html')
 }

 ipcMain.on('order_product', (event, args) => {
    ventanaOrdenarProductos()
})


let prov;
function ventanaProveedores() { 
    prov = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    })

    prov.loadFile('./proveedores/proveedores.html')
 }

ipcMain.on('open_prov', (event, args) => {
  console.log('click')
  ventanaProveedores()
})

let categorias;
function ventanaCategorias() { 
  categorias = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    })

    categorias.loadFile('./categorias/categorias.html')
 }

ipcMain.on('open_cate', (event, args) => {
  ventanaCategorias()
})