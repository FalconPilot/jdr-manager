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
**  Create JSON file
*/

function createFile(filename) {
  callback = "Unknown status"
  lstat('/data/' + filename + '.json', function(err, stats)) {
    if (!err) {
      fs.writeFile(filename, '')
      callback = "Success !"
    } else {
      callback = "Error : file already exist !"
    }
  }
  return callback
}

/*
**  Load data files
*/

function loadFiles() {
  path = __dirname + '/data/'
}

/*
**  Get JSON
*/

function getJSON(src) {
  return getDir(src, '.json')
}

/*
**  Get Directory Content
*/

function getDir(src, filter) {
  return fs.readdirSync(src).filter(function(file) {
    return file.slice(-filter.length) === filter
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
