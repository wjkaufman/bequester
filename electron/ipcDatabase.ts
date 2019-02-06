
export function ipcDatabase(ipcMain, win, db) {
  
  // add event listeners for different SQL queries
  
  ipcMain.on('getBequests', (event, arg) => {
    
    db.all("SELECT * FROM bequests", function(err, bequests) {
        console.log('got bequests!')
        win.webContents.send('getBequestsResponse', bequests)
    });
    
  });
  
  // more queries here...
};
