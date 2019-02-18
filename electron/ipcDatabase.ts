
export function ipcDatabase(ipcMain, win, db) {
  
  // add event listeners for different SQL queries
  
  ipcMain.on('getBequests', (event, arg) => {
    db.all("SELECT * FROM bequests", (err, bequests) => {
        win.webContents.send('getBequestsResponse', bequests)
    });
  });
  
  ipcMain.on('getPeople', (event, arg) => {
    db.all('select * from people', (err, people) => {
      win.webContents.send('getPeopleResponse', people)
    })
  })
  
  ipcMain.on('getBequestHoldings', (event, arg) => {
    db.all(`select * from holdings a
            join bequests b on a.bequestID = b.bequestID
            join people c on a.personID = c.personID
            where a.bequestID = ${arg}
            order by a.dateStarted`, (err, holdings) => {
              win.webContents.send('getBequestHoldingsResponse', holdings)
            })
  })
};
