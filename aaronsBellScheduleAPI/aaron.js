//This File uses a bit.io PostGreSQL Database to store and Retrieve Announce
const { Pool } = require("pg");

//import the crypto module to create random ids
const crypto = require("crypto");

// Create a connection pool using the connection information provided on bit.io.
const bsadbp = new Pool({
  //bell schedule anouncements database pool
  user: process.env.bitiouser,
  host: "db.bit.io",
  database: "ABUCKY0/bellschedule",
  password: process.env.bitiopass, // key from bit.io database page connect menu
  port: process.env.port,
  ssl: true,
});

// bsadbp.query("INSERT INTO announcements (title, description, id) VALUES ('Test', 'test description from harrison', 'first')")
// bsadbp.query("ALTER TABLE announcements ADD COLUMN id TEXT")
function runCommand(command){
  
  if(!command){
    return {success: false, message: "blank fields"};
  }
  
  bsadbp.query(command);
  
  // {id} is the same as {id: id}
  return {success: true, command};
}
//this is supposed to return the table taken from my database. It gets it from the above place, and is supposed to return what it got back.
function getAll() {
  return new Promise((res, rej) => {
    //the table name needs to be out of the quotes
    bsadbp.query("SELECT * FROM announcements WHERE true ORDER BY id DESC", (err, result) => {
      //some error handling could help out here
      if (err) {
        console.log(err);
        rej(err);
      } else {
        res(result.rows);
      }
    });
  });
    
    //Hey Harrison, if you see this, can you figure out why this doesn't save to a variable properly? It would return something like this:
    //[ { title: 'value', description: 'nope', tags: [ 'val1', 'val2' ] } ]  (If you wanna see it in action, uncomment the console log above)
    //but it outputs undefined
    //If you wanna see it in a table form, theres a /* */ comment below with the stuff to uncomment

    //So I think it has something to do with this being like an extended thingy, but I tried putting a return statement below the }); but it didn't work.
}

function getSingle(id) {
  return new Promise((res, rej) => {
    bsadbp.query("SELECT * FROM announcements WHERE id=$1", [id], (err, result) => {
      //some error handling could help out here
      if (err) {
        console.log(err);
        rej(err);
      } else {
        res(result.rows);
      }
    });
  });
}

function addAnnouncement(options){
  //options should include 
  //title, description, and tags
  
  //auto generate id from random bytes
  const id = crypto.randomBytes(7).toString("hex");
  
  //destructured from options variable
  const {title, description, tags} = options;
  
  if(!title || !description || !tags){
    return {success: false, message: "blank fields"};
  }
  
  bsadbp.query("INSERT INTO announcements (title, description, tags) VALUES ($1, $2, $3)", [title, description, tags]);
  
  // {id} is the same as {id: id}
  return {success: true, id};
}
function getSchedules() {
  return new Promise((res, rej) => {
  bsadbp.query("SELECT * FROM schedules", (err, result) => {
    if (err) {
        console.log(err);
        rej(err);
      } else {
        res(result.rows);
      }
  });
  });
};

// bsadbp.query('SELECT * FROM "announcements"', (err, res) => {
//     console.log(res.rows);
//     console.table(res.rows); // you could also just console.log, but console.table is neat :)
// });

module.exports = { getAll, getSingle, addAnnouncement, getSchedules, runCommand };
