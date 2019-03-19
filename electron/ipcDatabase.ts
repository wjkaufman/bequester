
export function ipcDatabase(ipcMain, win, db) {
  
  // add event listeners for different SQL queries
  
  //
  // BEQUESTS
  //
  
  ipcMain.on('getBequests', (event, arg) => {
    db.all(`SELECT * FROM bequests WHERE isDeleted == 0
            ORDER BY name, dateCreated`, (err, bequests) => {
        win.webContents.send('getBequestsResponse', bequests)
    });
  });
  
  ipcMain.on('getBequestsByString', (event, arg) => {
    db.all(`SELECT * FROM bequests
            WHERE isDeleted == 0 AND(name LIKE '%' || ?1 || '%' OR
              desc LIKE '%' || ?1 || '%' OR
              dateCreated LIKE '%' || ?1 || '%')
            ORDER BY name, dateCreated`, arg, (err, bequests) => {
      if (err) {
        console.error(err);
      }
      win.webContents.send('getBequestsByStringResponse', bequests)
    })
  })
  
  ipcMain.on('updateBequest', (event, arg) => {
    db.run(`UPDATE bequests SET
              name = ?, desc = ?, dateCreated = ?, isDeleted = ?
              WHERE bequestID = ?`,
            arg.name, arg.desc, arg.dateCreated, arg.isDeleted, arg.bequestID,
            (err, res) => {
              win.webContents.send('updateBequestResponse', res)
            });
  });
  
  ipcMain.on('createBequest', (event, arg) => {
    db.run(`INSERT INTO bequests (bequestID, name, desc, dateCreated, isDeleted)
              VALUES ((SELECT max(bequestID) + 1 from bequests), ?, ?, ?, ?)`,
            arg.name, arg.desc, arg.dateCreated, arg.isDeleted,
            (err, res) => {
              win.webContents.send('createBequestResponse', res);
            });
  });
  
  ipcMain.on('deleteBequest', (event, arg) => {
    db.run(`DELETE FROM bequests WHERE bequestID = ?`,
      arg.bequestID, (err, res) => {
        win.webContents.send('deleteBequestResponse');
      });
  });
  
  //
  // PEOPLE
  //
  
  ipcMain.on('getPeople', (event, arg) => {
    db.all(`select * from people WHERE isDeleted == 0
              ORDER BY gradYear, lastname, firstname`, (err, people) => {
      win.webContents.send('getPeopleResponse', people)
    })
  })
  
  // TODO change this to match format for bequest query
  ipcMain.on('getPeopleByString', (event, arg) => {
    db.all(`SELECT * FROM people
            WHERE isDeleted == 0 AND (firstname LIKE '%' || ?1 || '%' OR
             lastname LIKE '%' || ?1 || '%' OR
             position LIKE '%' || ?1 || '%' OR
             CAST(gradYear AS TEXT) LIKE '%' || ?1 || '%')
            ORDER BY gradYear, lastname, firstname`, arg, (err, people) => {
      if (err) {
        console.error(err);
      }
      win.webContents.send('getPeopleByStringResponse', people)
    })
  })
  
  ipcMain.on('updatePerson', (event, arg) => {
    db.run(`UPDATE people SET
              firstname = ?, lastname = ?, position = ?, gradYear = ?,
              isDeleted = ?
              WHERE personID = ?`,
            arg.firstname, arg.lastname, arg.position, arg.gradYear, arg.isDeleted,
            arg.personID, (err, res) => {
            win.webContents.send('updatePersonResponse', res);
          });
  });
  
  ipcMain.on('createPerson', (event, arg) => {
    db.run(`INSERT INTO people (personID, firstname, lastname, position,
                gradYear, isDeleted)
              VALUES ((SELECT max(personID) + 1 from people), ?, ?, ?, ?, ?)`,
            arg.firstname, arg.lastname, arg.position,
            arg.gradYear, arg.isDeleted, (err, res) => {
              win.webContents.send('createPersonResponse', res);
            });
  });
  
  //
  // HOLDINGS
  //
  
  ipcMain.on('getBequestHoldings', (event, arg) => {
    db.all(`SELECT * FROM holdings a
              JOIN bequests b on a.bequestID = b.bequestID
              JOIN people c on a.personID = c.personID
              where a.bequestID = ? AND a.isDeleted = 0
              order by a.dateStarted, c.lastname`, arg,
            (err, holdings) => {
              win.webContents.send('getBequestHoldingsResponse', holdings)
            });
  });
  
  ipcMain.on('getPersonHoldings', (event, arg) => {
    db.all(`SELECT * FROM holdings a
              JOIN bequests b on a.bequestID = b.bequestID
              JOIN people c on a.personID = c.personID
              where c.personID = ? AND a.isDeleted = 0
              order by a.dateStarted, b.name`, arg,
            (err, holdings) => {
              win.webContents.send('getPersonHoldingsResponse', holdings)
            });
  });
  
  ipcMain.on('updateHolding', (event, arg) => {
    db.run(`UPDATE holdings SET
              personID = ?, bequestID = ?, dateStarted = ?, comment = ?,
              isDeleted = ?
              WHERE holdingID = ?`, arg.personID, arg.bequestID, arg.dateStarted,
            arg.comment, arg.isDeleted, arg.holdingID, (err, res) => {
              win.webContents.send('updateHoldingResponse', res);
            });
  });
  
  ipcMain.on('createHolding', (event, arg) => {
    db.run(`INSERT INTO holdings (holdingID, personID, bequestID,
              dateStarted, comment, isDeleted) VALUES
              ((SELECT max(holdingID) + 1 from holdings), ?, ?, ?, ?, ?)`,
            arg.personID, arg.bequestID, arg.dateStarted, arg.comment, arg.isDeleted,
            (err, res) => {
              win.webContents.send('createHoldingResponse', res);
            });
  })
};
