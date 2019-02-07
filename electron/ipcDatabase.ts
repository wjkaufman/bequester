
export function ipcDatabase(ipcMain, win, db) {
  
  // add event listeners for different SQL queries
  
  ipcMain.on('getBequests', (event, arg) => {
    db.all("SELECT * FROM bequests", (err, bequests) => {
        console.log('got bequests!')
        win.webContents.send('getBequestsResponse', bequests)
    });
  });
  
  ipcMain.on('getPeople', (event, arg) => {
    db.all('select * from people', (err, people) => {
      win.webContents.send('getPeopleResponse', people)
    })
  })
};
