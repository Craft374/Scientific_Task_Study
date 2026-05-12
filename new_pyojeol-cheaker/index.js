const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const melody2midi = require('melody2midi');
const fs = require('fs');
const os = require('os');
const { analyzeMidi } = require('./test-copy');

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
    //win.webContents.openDevTools();

    ipcMain.on('minimize', () => {
      win.minimize();
    });
  
    ipcMain.on('close', () => {
      win.close();
    });

    ipcMain.on('start-analyze', (event, filePath1, filePath2) => {
      const randomTempName = path.join(os.tmpdir(), Math.random().toString(36).substring(2, 12));

      const promise1 = new Promise((resolve, reject) => {
        melody2midi.extractMIDI(filePath1)
          .then((midiBinaryData) => {
            console.log("first midi binary data: ", midiBinaryData);
            fs.writeFileSync(`${randomTempName}A.mid`, midiBinaryData, 'binary');
            resolve(`${randomTempName}A.mid`);
          })
          .catch((error) => {
            console.error("error: ", error);
            reject(error);
          });
      });
    
      const promise2 = new Promise((resolve, reject) => {
        melody2midi.extractMIDI(filePath2)
          .then((midiBinaryData) => {
            console.log("second midi binary data: ", midiBinaryData);
            fs.writeFileSync(`${randomTempName}B.mid`, midiBinaryData, 'binary');
            resolve(`${randomTempName}B.mid`);
          })
          .catch((error) => {
            console.error("error: ", error);
            reject(error);
          });
      });

      const promise3 = new Promise((resolve, reject) => {
        melody2midi.extractKey(filePath1)
          .then((key) => {
            resolve(convertKeyFormat(key));
          })
          .catch((error) => {
            console.error("error: ", error);
            reject(error);
          });
      });
    
      const promise4 = new Promise((resolve, reject) => {
        melody2midi.extractKey(filePath2)
          .then((key) => {
            resolve(convertKeyFormat(key));
          })
          .catch((error) => {
            console.error("error: ", error);
            reject(error);
          });
      });
    
      Promise.all([promise1, promise2, promise3, promise4])
        .then(([midiFilePath1, midiFilePath2, key1, key2]) => {
          console.log(midiFilePath1, midiFilePath2, key1, key2);

          let filename_to_save = null;

          try {
            const { result, filename_to_save: savedFilePath } = analyzeMidi(
              midiFilePath1,
              midiFilePath2,
              key1,
              key2,
            );

            filename_to_save = savedFilePath;
            console.log(`stdout: ${result}`);
            win.webContents.send('analysis-complete', result.toString());
          } catch (error) {
            console.error('stderr:', error);
            win.webContents.send('analysis-error', error.toString());
          } finally {
            [midiFilePath1, midiFilePath2, filename_to_save].filter(Boolean).forEach((filePath) => {
              fs.unlink(filePath, (err) => {
                if (err && err.code !== 'ENOENT') {
                  console.error(err);
                  return;
                }

                console.log(`${filePath} 삭제`);
              });
            });
          }
        })
        .catch((error) => {
          console.error("error: ", error);
          win.webContents.send('analysis-error');
        });
      // 렌더러 프로세스에 응답을 보낼 수도 있음
      //event.reply('file-dropped-response', 'File path received successfully!');
    });

    function convertKeyFormat(keyData) {
      let keyName = keyData.key;
      let scaleName = keyData.scale;
    
      // 플랫 표기 변경
      if (keyName.includes('b')) {
        keyName = keyName.replace('b', '-');
      }
    
      // 스케일 변경
      if (scaleName === 'minor') {
        switch (keyName.charAt(0)) {
          case 'A':
            keyName = keyName.replace('A', 'C');
            break;
          case 'B':
            keyName = keyName.replace('B', 'D');
            break;
          case 'C':
            keyName = keyName.replace('C', 'E');
            break;
          case 'D':
            keyName = keyName.replace('D', 'F');
            break;
          case 'E':
            keyName = keyName.replace('E', 'G');
            break;
          case 'F':
            keyName = keyName.replace('F', 'A');
            break;
          case 'G':
            keyName = keyName.replace('G', 'B');
            break;
          default:
            break;
        }
        scaleName = 'major';
      }
    
      return keyName;
    }
  }

app.whenReady().then(() => {
    createWindow();
})
