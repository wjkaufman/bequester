import { BEQUESTS } from './mock-bequests';

// no idea if this is how I should do it
// but it feels like maybe?

export function ipcDatabase(ipcMain, win) {
  ipcMain.on('getBequests', (event, arg) => {
    // TODO do sql stuff here
    const bequests = BEQUESTS; // eventually the result of the query
    console.log('in main, got getBequests, sending bequests now');
    win.webContents.send('getBequestsResponse', bequests);
  });
  
  // more SQL queries here...
};
