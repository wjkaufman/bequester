const sqlite3 = require('sqlite3')

var db = new sqlite3.Database('./lonepine.db');

db.serialize(function() {
  
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
});

db.close();
