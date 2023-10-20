const { app, BrowserWindow } = require('electron');
const path = require('path');

const createWindow = () => {
    const win = new BrowserWindow({
      width: 960,
      height: 560,
      fullscreen: false,
      fullscreenable: false,
      maximizable: false,
      icon: path.join(__dirname, 'icon.ico'),
      webPreferences: {
        nodeIntegration: true
      }
    });
    win.setMenu(null);
    win.loadFile('page/index.html');
  }

app.whenReady().then(() => {
    createWindow();
})