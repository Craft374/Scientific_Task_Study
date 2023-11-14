const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const melody2midi = require('melody2midi');

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

    ipcMain.on('start-analyze', (event, filePath1, filePath2) => {
      const randomTempName = Math.random().toString(36).substring(2, 12);

      melody2midi.extract(filePath1)
      .then((midiBinaryData) => {
        console.log("first midi binary data: ", midiBinaryData);
      })
      .catch((error) => {
        console.error("error: ", error)
      })

      melody2midi.extract(filePath2)
      .then((midiBinaryData) => {
        console.log("second midi binary data: ", midiBinaryData);
      })
      .catch((error) => {
        console.error("error: ", error)
      })
      // 렌더러 프로세스에 응답을 보낼 수도 있음
      //event.reply('file-dropped-response', 'File path received successfully!');
    });
  }

app.whenReady().then(() => {
    createWindow();
})