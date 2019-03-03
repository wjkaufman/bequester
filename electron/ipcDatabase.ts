
export function ipcDatabase(ipcMain, win, db) {
  
  // add event listeners for different SQL queries
  
  //
  // BEQUESTS
  //
  
  ipcMain.on('getBequests', (event, arg) => {
    db.all("SELECT * FROM bequests", (err, bequests) => {
        win.webContents.send('getBequestsResponse', bequests)
    });
  });
  
  ipcMain.on('updateBequest', (event, arg) => {
    db.run(`UPDATE bequests SET
              name = ?, desc = ?, dateCreated = ?
              WHERE bequestID = ?`,
            arg.name, arg.desc, arg.dateCreated, arg.bequestID,
            (err, res) => {
              win.webContents.send('updateBequestResponse', res)
            });
  });
  
  //
  // PEOPLE
  //
  
  ipcMain.on('getPeople', (event, arg) => {
    db.all('select * from people', (err, people) => {
      win.webContents.send('getPeopleResponse', people)
    })
  })
  
  ipcMain.on('updatePerson', (event, arg) => {
    db.run(`UPDATE people SET
              firstname = ?, lastname = ?, position = ?, gradYear = ?
              WHERE personID = ?`,
            arg.firstname, arg.lastname, arg.position, arg.gradYear, arg.personID,
          (err, res) => {
            win.webContents.send('updatePersonResponse', res);
          });
  });
  
  //
  // HOLDINGS
  //
  
  ipcMain.on('getBequestHoldings', (event, arg) => {
    db.all(`select * from holdings a
              join bequests b on a.bequestID = b.bequestID
              join people c on a.personID = c.personID
              where a.bequestID = ?
              order by a.dateStarted`, arg,
            (err, holdings) => {
              win.webContents.send('getBequestHoldingsResponse', holdings)
            });
  });
  
  ipcMain.on('getPersonHoldings', (event, arg) => {
    db.all(`select * from holdings a
              join bequests b on a.bequestID = b.bequestID
              join people c on a.personID = c.personID
              where c.personID = ?
              order by a.dateStarted`, arg,
            (err, holdings) => {
              win.webContents.send('getPersonHoldingsResponse', holdings)
            });
  });
  
  ipcMain.on('updateHolding', (event, arg) => {
    db.run(`UPDATE holdings SET
              personID = ?, bequestID = ?, dateStarted = ?, comment = ?
              WHERE holdingID = ?`, arg.personID, arg.bequestID, arg.dateStarted,
            arg.comment, arg.holdingID, (err, res) => {
              win.webContents.send('updateHoldingResponse', res);
            });
  });
};
