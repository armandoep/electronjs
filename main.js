const { app, BrowserWindow, ipcMain } = require('electron')
// const mysql = require('mysql2')

// let nameSignUp = document.getElementById('nameSignUp');
// let usernameSignUp = document.getElementById('usernameSignUp');
// let pass = document.getElementById('passwordSignUp');
// let submitSignUp = document.getElementById('submitSignUp')

//submitSignUp.addEventListener('click', SingUp)

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
    // productos.webContents.on('did-finish-load', () => {
    //    productos.webContents.send('username', args)
    // })
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
    // productos.webContents.on('did-finish-load', () => {
    //    productos.webContents.send('username', args)
    // })
})


//MySQL Connection

// const connection = mysql.createConnection({
//     host: process.env.HOST,
//     user: process.env.USER,
//     password: process.env.PASS,
//     database: process.env.DATABASE,
//   });
  
//   function SingUp() {
//     connection
//       .promise()
//       .query(
//         `insert into users
//                           (name, username, password) 
//                           values 
//                           (${nameSignUp.value}, ${usernameSignUp.value}, ${pass.value})`
//       )
//       .then(([results, fields]) => {
//         console.log(results);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }

  