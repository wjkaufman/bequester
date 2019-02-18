const sqlite3 = require('sqlite3')

var db = new sqlite3.Database('./lonepine.db');

db.serialize(function() {
  
  //
  // BEQUESTS
  //
  
  // create table for bequests
  db.run(`CREATE TABLE if not exists bequests (
      bequestID integer primary key,
      name text not null, desc text, dateCreated text
    )`);
  
  console.log('Created table (if it doesn\'t already exist)');
  
  // insert dummy bequests
  db.run(`insert into bequests values (
    (select max(bequestID)+1 from bequests),
    'H150 betting shirt', 'Old and gross, ew!', '1905-02-18'
  )`)
  db.run(`insert into bequests values (
    (select max(bequestID)+1 from bequests),
    'C150 betting shirt', null, '1905-02-18'
  )`)
  db.run(`insert into bequests values (
    (select max(bequestID)+1 from bequests),
    'P150 betting shirt', 'Nice and fresh.', '2008-11-18'
  )`)
  db.run(`insert into bequests values (
    (select max(bequestID)+1 from bequests),
    'Y150 betting shirt', 'Lots of holes in it', '1862-03-21'
  )`)
  
  console.log('Created dummy bequests:');
  
  db.each("SELECT * FROM bequests", function(err, b) {
      console.log(b.bequestID, b.name, b.desc, b.dateCreated);
  });
  
  console.log('Finished populating database with bequests');
  
  //
  // PEOPLE
  //
  
  // create table
  db.run(`CREATE TABLE if not exists people (
      personID integer primary key,
      firstname text not null, lastname text not null,
      position text, gradYear integer
    )`);
  
  console.log('Created peopletable (if it doesn\'t already exist)');
  
  // insert dummy people
  db.run(`insert into people values (
    (select max(personID)+1 from people),
    'Walter', 'Banfield', 'Rower', 2017
  )`)
  db.run(`insert into people values (
    (select max(personID)+1 from people),
    'Sean', 'Oh', 'Rower', 2017
  )`)
  db.run(`insert into people values (
    (select max(personID)+1 from people),
    'Jeff', 'Gao', 'Rower', 2018
  )`)
  db.run(`insert into people values (
    (select max(personID)+1 from people),
    'Kiana', 'Outen', 'Coxswain', 2018
  )`)
  
  console.log('Created dummy people (not that they\'re dumb):');
  
  db.each("SELECT * FROM people", function(err, b) {
      console.log(b.personID, b.firstname, b.lastname, b.gradYear);
  });
  
  //
  // HOLDINGS
  //
  
  // table for holdings (associates beqest and person)
  
  db.run(`CREATE TABLE if not exists holdings (
      holdingID integer primary key,
      personID integer not null, bequestID not null,
      dateStarted text not null
    )`);
  
  console.log('Created holdings table (if it doesn\'t already exist)');
  
  // insert dummy bequests
  db.run(`insert into holdings values (
    (SELECT MAX(holdingID)+1 FROM holdings),
    (SELECT personID FROM people ORDER BY RANDOM() LIMIT 1),
    (SELECT bequestID FROM bequests ORDER BY RANDOM() LIMIT 1),
    '2011-02-01'
  )`)
  db.run(`insert into holdings values (
    (SELECT MAX(holdingID)+1 FROM holdings),
    (SELECT personID FROM people ORDER BY RANDOM() LIMIT 1),
    (SELECT bequestID FROM bequests ORDER BY RANDOM() LIMIT 1),
    '2012-02-01'
  )`)
  db.run(`insert into holdings values (
    (SELECT MAX(holdingID)+1 FROM holdings),
    (SELECT personID FROM people ORDER BY RANDOM() LIMIT 1),
    (SELECT bequestID FROM bequests ORDER BY RANDOM() LIMIT 1),
    '2013-02-01'
  )`)
  db.run(`insert into holdings values (
    (SELECT MAX(holdingID)+1 FROM holdings),
    (SELECT personID FROM people ORDER BY RANDOM() LIMIT 1),
    (SELECT bequestID FROM bequests ORDER BY RANDOM() LIMIT 1),
    '2014-05-01'
  )`)
  db.run(`insert into holdings values (
    (SELECT MAX(holdingID)+1 FROM holdings),
    (SELECT personID FROM people ORDER BY RANDOM() LIMIT 1),
    (SELECT bequestID FROM bequests ORDER BY RANDOM() LIMIT 1),
    '2016-02-03'
  )`)
  db.run(`insert into holdings values (
    (SELECT MAX(holdingID)+1 FROM holdings),
    (SELECT personID FROM people ORDER BY RANDOM() LIMIT 1),
    (SELECT bequestID FROM bequests ORDER BY RANDOM() LIMIT 1),
    '2017-05-12'
  )`)
  db.run(`insert into holdings values (
    (SELECT MAX(holdingID)+1 FROM holdings),
    (SELECT personID FROM people ORDER BY RANDOM() LIMIT 1),
    (SELECT bequestID FROM bequests ORDER BY RANDOM() LIMIT 1),
    '2018-06-12'
  )`)
  
  console.log('Created dummy holdings');
  
  db.each(`SELECT * FROM holdings a
      JOIN people b ON a.personID = b.personID
      JOIN bequests c ON a.bequestID = c.bequestID
    `, function(err, h) {
      // console.log(h);
      console.log(h.holdingID, h.firstname, h.name, h.dateStarted);
  });
  
  console.log('Finished populating database with dummy data');
});

db.close();
