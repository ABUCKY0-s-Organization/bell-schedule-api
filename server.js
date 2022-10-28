const express = require("express");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const fs = require("fs");

const axios = require("axios");
const cors = require("cors");

//for storing and managing cookies
const cookieParser = require("cookie-parser");
app.use(cookieParser());

//dotenv - glitch adds the env variables automatically

//harrison - import the postgres database from
//postgres.js
const db = require("./aaronsBellScheduleAPI/aaron.js");

const hmandb = require("./hmansBellScheduleAPI/hman.js");


//general api to get all announcements
app.get("/api/announcements", async (req, res) => {
  try {
    const getAll = await db.getAll();
    res.status(200).json({ success: true, data: getAll });
  } catch (err) {
    res.status(400).json({ err });
  }
});

app.get("/api/announcements/:id", async (req, res) => {
  //this is your announcement id
  const id = req.params.id;

  //https://node-js-api.glitch.me/announcement/first

  // console.log(db);

  try {
    const getID = await db.getSingle(id);
    if (getID.length > 0) {
      res.status(200).send({ success: true, data: getID[0] });
    } else {
      res.status(400).send({ success: false, error: "No such announcement" });
    }
  } catch (err) {
    res.status(400).send({ success: false, error: err });
  }
});

app.get("/create", (req, res) => {
  res.sendFile(__dirname + "/views/create.html");
});

app.post("/api/announcements", (req, res) => {
  //destructured from the request body
  const { title, description, tags, password } = req.body;

  //you can change the admin password in `.env`
  if (password !== process.env.adminPassword) {
    //`return` insures that the function stops here
    return res.send({ success: false, message: "unauthorized" });
  }
  //the reason I do this is so no extra parameters get passed into the function.
  const add = db.addAnnouncement({
    title,
    description,
    tags: JSON.stringify(tags.trim().split(",")),
  });
  res.send(add);
});
app.get("/api/schedules", async (req, res)=> {
  try {
  const schedule = await db.getSchedules();
  
  res.status(200).json({ success: true, data: schedule });
  } catch (err) {
    res.status(400).json({ err });
  }
})
//home
app.get("/api", (req, res) => {
  res.sendFile(__dirname + "/views/home/home.html");
});
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/home/home.html");
});
app.get("/beta-announcements", (req, res) => {
  res.sendFile(__dirname + "aaronsBellScheduleAPI/views/beta_announcements_page.html");
});

app.get("/databaseEdit", async (req, res) => {
  const { command, password } = req.body;

  //you can change the admin password in `.env`
  if (password !== process.env.adminPassword) {
    //`return` insures that the function stops here
    return res.send({ success: false, message: "unauthorized" });
  }
})


//imported from the Bell-Countdown-Api


//I want to add the menu stuff here but I just haven't yet




//AAAAAAAAAAAAARONS STUFF GOES ABOVE THIS
//HARRISONNNNNNNNNS STUFF GOES BELOW HERE





app.get("/api/hman/announcements", async (req, res) => {
  try {
    const an = await hmandb.getAll();
    res.status(200).json({ success: true, data: an });
  } catch (err) {
    res.status(400).json({ err });
  }
});

app.get("/api/hman/announcements/:id", async (req, res) => {
  //this is your announcement id
  const id = req.params.id;

  //https://node-js-api.glitch.me/announcement/first

  // console.log(db);

  try {
    const an = await hmandb.getSingle(id);
    if (an.length > 0) {
      res.status(200).send({ success: true, data: an[0] });
    } else {
      res.status(400).send({ success: false, error: "No such announcement" });
    }
  } catch (err) {
    res.status(400).send({ success: false, error: err });
  }
});

app.get("/hman/create", (req, res) => {
  res.sendFile(__dirname + "/hmansBellScheduleAPI/views/create.html");
});

app.post("/api/hman/announcements", (req, res) => {
  //destructured from the request body
  const { title, description, tags, password } = req.body;

  //you can change the admin password in `.env`
  if (password !== process.env.hmanAdminPassword) {
    //`return` insures that the function stops here
    return res.send({ success: false, message: "unauthorized" });
  }
  //the reason I do this is so no extra parameters get passed into the function.
  const add = hmandb.addAnnouncement({
    title,
    description,
    tags: JSON.stringify(tags.trim().split(",")),
  });
  res.send(add);
});
app.get("/api/hman/schedules", async (req, res)=> {
  try {
  const schedule = await hmandb.getSchedules();
  
  res.status(200).json({ success: true, data: schedule });
  } catch (err) {
    res.status(400).json({ err });
  }
})
//home
app.get("/api/hman", (req, res) => {
  res.status(200).sendFile(__dirname + "/views/home/home.html");
});
app.get("/hman", (req, res) => {
  res.status(200).sendFile(__dirname + "/views/home/home.html");
});
app.get("/hman/beta-announcements", (req, res) => {
  res.status(200).sendFile(__dirname + "/views/beta_announcements_page.html");
});

app.post("api/hman/databaseEdit", (req, res) => {
  //destructured from the request body
  const { command, password } = req.body;

  //you can change the admin password in `.env`
  if (password !== process.env.hmanAdminPassword) {
    //`return` insures that the function stops here
    return res.send({ success: false, message: "unauthorized" });
  }
  //the reason I do this is so no extra parameters get passed into the function.
  const add = hmandb.runCommand(command);
  res.send(add);
});

app.get("/hman/databasecmd", (req, res) => {
  res.status(200).sendFile(__dirname + "/hmansBellScheduleAPI/views/command.html")
})

app.get('*', function(req, res){
  res.status(404).send({ success: false , message: "That Directory Was Not Found on this server. Thats all we know." });
});
//listen for requests on the server
app.listen(process.env.PORT);
