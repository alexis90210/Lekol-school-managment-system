'use strict';
const  { app, BrowserWindow, ipcMain }  = require( "electron");
const DEV_SERVER_URL = process.env.DEV_SERVER_URL
const isProduction = process.env.NODE_ENV === 'production'
var isDev = process.env.NODE_ENV === 'development'

const path = require("path");

// window
const DIR_ASSETS ="/src/renderer/assets/";

let win;

function _nuxtPage(path){
  const serverUrl = isDev ? DEV_SERVER_URL : 'app://./index.html'
  const fullPath = serverUrl + '#' + path;
  return fullPath

}

// MAIN WINDOW CREATION
function createMainWindow() {
  win = new BrowserWindow({
    frame: true,
    width:1200,
    height:700,
    resizable:true,
    fullscreenable:true,
    fullscreen:true,
    icon: path.join(__dirname, DIR_ASSETS, "logo.png"),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      nativeWindowOpen: true,
      // devTools:false,
      
    },
  });

  
  win.maximize()
  win.setMenu(null)
  // LOAD PAGE FROM NUXT
  win.loadURL(_nuxtPage('/'));
  
}



// start app

app.on("ready", createMainWindow);

// close if MAC

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// ======== IPC MAIN =================

ipcMain.on("reduce-window", function () {
  win.minimizable = true
  win.minimize()
})

ipcMain.on("close-window", function () {
  win.close()

})
