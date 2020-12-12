const { app, BrowserWindow, contentTracing, webContents } = require('electron')
const fs = require('fs')
const watch = require('node-watch')

function createWindow () {  
  // Cria uma janela de navegação.
  let win = new BrowserWindow({
    minWidth: 1380,
    minHeight: 1100,
    show: false,
    webPreferences: {
      nodeIntegration: true
    }
  })
  let confirmCadastro = new BrowserWindow({
    width: 1180,
    height: 700,
    show:false,
    frame:false,
    parent: win,
    modal:true,
    webPreferences: {
      nodeIntegration: true
    }
  })
  
  confirmCadastro.setMaximumSize(1180, 700)
  confirmCadastro.setMinimumSize(1180, 700)
  confirmCadastro.setIcon(__dirname+'/image/icon.ico')
  confirmCadastro.loadFile('pages/cadastro/confirm_cadastro.html')
  watch('./database/watch.json', { recursive: true }, function(evt, name) {
    let dadosWatch = JSON.parse(fs.readFileSync('./database/watch.json'))
    if ( evt && dadosWatch.confirmaCadastro == "abrir" ) {
      confirmCadastro.show()
    }
    if ( evt && dadosWatch.confirmaCadastro == "cadastrado" ) {
      confirmCadastro.hide()
    }
})
  //win.webContents.on('did-finish-load', ()=> {
  //  win.show()
  //})
  win.maximize()
  // Configura a barra de ferramentas no topo da pagina
  win.setMenu(null)
  win.setIcon(__dirname+'/image/icon.ico')
  //win.webContents.openDevTools()  

  // e carregar o index.html do aplicativo.
  win.loadFile('pages/index.html')
}

app.whenReady().then(createWindow)
