import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';
import * as url from 'url';
import * as sqlite3 from 'sqlite3';
import { BEQUESTS } from './mock-bequests';

let win: BrowserWindow;

function createWindow() {
  win = new BrowserWindow({ width: 800, height: 600,
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
  
  win.on("closed", () => {
    win = null;
  });
}

app.on("ready", createWindow);

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

// database stuff

var db = new sqlite3.Database('./test.db');

db.serialize(function() {
  // db.run("CREATE TABLE lorem (info TEXT)");
  //
  // var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
  // for (var i = 0; i < 10; i++) {
  //     stmt.run("Ipsum " + i);
  // }
  // stmt.finalize();

  db.each("SELECT rowid AS id, info FROM lorem", function(err, row) {
      console.log(row.id + ": " + row.info);
  });
});

db.close();

// IPC stuff

ipcMain.on('getBequests', (event, arg) => {
  // TODO do sql stuff here
  const bequests = BEQUESTS; // eventually the result of the query
  console.log('in main, got getBequests, sending bequests now')
  win.webContents.send('getBequestsResponse', bequests);
});
