const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

const createWindow = () => {
    const win = new BrowserWindow({
      width: 960,
      height: 560,
      
	    frame: false,
      fullscreen: false,
      fullscreenable: false,
      maximizable: false,
      resizable: false,
      icon: path.join(__dirname, 'icon.ico'),
      webPreferences: {
        nodeIntegration: true,
        enableRemoteModule: true,
        contextIsolation : false
      }
    });
    win.setMenu(null);
    win.loadFile('page/index.html');
    win.webContents.openDevTools();

    ipcMain.on('minimize', () => {
      win.minimize();
    });
  
    ipcMain.on('close', () => {
      win.close();
    });
  }

app.whenReady().then(() => {
    createWindow();
})