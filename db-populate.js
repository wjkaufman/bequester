const sqlite3 = require('sqlite3')

var db = new sqlite3.Database('./lonepine.db');

db.serialize(function() {
  
  // create tables
  
  // create bequests table
  db.run(`CREATE TABLE if not exists bequests (
      bequestID integer primary key,
      name text not null, desc text, dateCreated text,
      isDeleted integer
    )`);
    
  // create people table
  db.run(`CREATE TABLE if not exists people (
      personID integer primary key,
      firstname text not null, lastname text not null,
      position text, gradYear integer, isDeleted integer
    )`);
    
  db.run(`CREATE TABLE if not exists holdings (
      holdingID integer primary key,
      personID integer not null, bequestID integer not null,
      dateStarted text not null, comment text, isDeleted integer
    )`);
  
  console.log('Created tables (if it doesn\'t already exist)');
  
  //
  // create dummy data
  //
  
  // bequests
  db.run(`insert into bequests values (
    (select max(bequestID)+1 from bequests),
    'H150 betting shirt', 'Old and gross, ew!', '1905-02-18', 0
  )`)
  db.run(`insert into bequests values (
    (select max(bequestID)+1 from bequests),
    'C150 betting shirt', null, '1905-02-18', 0
  )`)
  db.run(`insert into bequests values (
    (select max(bequestID)+1 from bequests),
    'P150 betting shirt', 'Nice and fresh.', '2008-11-18', 0
  )`)
  db.run(`insert into bequests values (
    (select max(bequestID)+1 from bequests),
    'Y150 betting shirt', 'Lots of holes in it', '1862-03-21', 0
  )`)
  
  console.log('Created dummy bequests:');
  
  // people
  db.run(`insert into people values (
    (select max(personID)+1 from people),
    'Walter', 'Banfield', 'Rower', 2017, 0
  )`)
  db.run(`insert into people values (
    (select max(personID)+1 from people),
    'Sean', 'Oh', 'Rower', 2017, 0
  )`)
  db.run(`insert into people values (
    (select max(personID)+1 from people),
    'Jeff', 'Gao', 'Rower', 2018, 0
  )`)
  db.run(`insert into people values (
    (select max(personID)+1 from people),
    'Kiana', 'Outen', 'Coxswain', 2018, 0
  )`)
  
  console.log('Created dummy people (not that they\'re dumb):');
  
  // holdings
  for (let i=1; i<10; i++) {
    db.run(`insert into holdings values (
      (SELECT MAX(holdingID)+1 FROM holdings),
      (SELECT personID FROM people ORDER BY RANDOM() LIMIT 1),
      (SELECT bequestID FROM bequests ORDER BY RANDOM() LIMIT 1),
      '2012-05-0${i}', 'what a cool person, ${i}/10', 0
    )`)
  }
  
  // TODO keep on working on adding comments to holdings (forgot earlier)
  // then pull request, continue working on issues
  // maybe figure out date issue next??
  
  console.log('Created dummy holdings');
  
  // print out what I've made...
  
  db.each("SELECT * FROM bequests", function(err, b) {
      console.log(b.bequestID, b.name, b.desc, b.dateCreated);
  });
  
  db.each("SELECT * FROM people", function(err, b) {
      console.log(b.personID, b.firstname, b.lastname, b.gradYear);
  });
  
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
