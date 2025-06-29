const { app, BrowserWindow, screen, ipcMain } = require('electron');
const path = require('node:path');
const schedule = require('node-schedule');

let mainWindow;

const createWindow = () => {
  const primaryDisplay = screen.getPrimaryDisplay();
  const { width, height } = primaryDisplay.workAreaSize;

  mainWindow = new BrowserWindow({
    width: width,
    height: height,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    resizable: false,
    movable: false,
    show: false // 初期状態では非表示
  });

  mainWindow.loadFile('index.html');

  // ウィンドウが閉じられたら参照をクリア
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
};

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });

  // --- スケジュール設定start ---
  const punchInHour = 9;
  const punchInMinute = 55;
  // const punchOutHour = 19;
  // const punchOutMinute = 0;

  // 出勤アラートのスケジュール
    schedule.scheduleJob(`${punchInMinute} ${punchInHour} * * 1-5`, () => {     // 平日 (月-金)
    // schedule.scheduleJob(`${punchInMinute} ${punchInHour} * * *`, () => {       //テスト用
    console.log('出勤アラート');
    if (mainWindow) {
        mainWindow.show();
        mainWindow.webContents.send('show-punch-in-modal');
    }
  });

  /*
  // 退勤アラートのスケジュール
    // schedule.scheduleJob(`${punchOutMinute} ${punchOutHour} * * 1-5`, () => {       // 平日 (月-金)
    schedule.scheduleJob(`${punchOutMinute} ${punchOutHour} * * *`, () => {       //テスト用
    console.log('退勤アラート');
    if (mainWindow) {
        mainWindow.show();
        mainWindow.webContents.send('show-punch-out-modal');
    }
  });
  */
  // --- スケジュール設定end ---

  // レンダープロセスからモーダルが閉じられた通知を受け取る
  ipcMain.on('close-modal', () => {
    if (mainWindow) {
      mainWindow.hide(); // ウィンドウを非表示にする
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});