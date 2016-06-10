const electron  = require('electron')
const fs        = require('fs')
const path      = require('path')
const package   = require('./package.json')

const app           = electron.app
const BrowserWindow = electron.BrowserWindow

let win

/*
**  Create main window
*/

function createWindow() {
  win = new BrowserWindow({
    title: package.productName
  })
  win.loadURL('file://' + __dirname + '/main.html')
  win.on('closed', function() {
    app.quit()
  })
}

/*
**  App event listeners
*/

app.on('ready', function() {
  createWindow()
})

app.on('window-all-closed', function() {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function() {
  if (mainWindow === null) {
    createWindow()
  }
})
