//import { BEQUESTS } from './mock-bequests';
//import * as sqlite3 from 'sqlite3';

// no idea if this is how I should do it
// but it feels like maybe?

export function ipcDatabase(ipcMain, win, db) {
  ipcMain.on('getBequests', (event, arg) => {
    
    db.all("SELECT * FROM bequests", function(err, bequests) {
        console.log('got bequests!')
        win.webContents.send('getBequestsResponse', bequests)
    });
    
    // const bequests = BEQUESTS; // eventually the result of the query
    // console.log('in main, got getBequests, sending bequests now');
    // win.webContents.send('getBequestsResponse', bequests);
  });
  
  // more SQL queries here...
};
