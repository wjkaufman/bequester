import { app, BrowserWindow, ipcMain } from 'electron';
import { ipcDatabase } from './ipcDatabase';
import * as path from 'path';
import * as url from 'url';
import * as sqlite3 from 'sqlite3';

let win: BrowserWindow;

function createWindow() {
  win = new BrowserWindow({ width: 1200, height: 700,
    webPreferences: {
      nodeIntegration: true
    }});

  // load the dist folder from Angular
  win.loadURL(
    url.format({
      pathname: path.join(__dirname, `../../dist/index.html`),
      protocol: "file:",
      slashes: true
    })
  );

  // The following is optional and will open the DevTools:
  win.webContents.openDevTools()
  
  // add ipc database listeners
  ipcDatabase(ipcMain, win, db);
  
  win.on("closed", () => {
    win = null;
  });
}

// on macOS, closing the window doesn't quit the app
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// initialize the app's main window
app.on("activate", () => {
  if (win === null) {
    createWindow();
  }
});

// create database connection
var db = new sqlite3.Database('./lonepine.db');

app.on("ready", createWindow);
