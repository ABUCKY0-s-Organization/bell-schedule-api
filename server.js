//server.js - this is where your node.js server is 

//import and initiate express for server routing
const express = require("express");
const app = express();

//fs module for dealing with files on the server
const fs = require("fs");

//sample code to serve static files from the 'public' folder
//app.use(express.static("public"));

//sample api for getting specific announcements
app.get("/announcement/:id", (req, res) => {
  //this is your announcement id
  const id = req.params.id;
  
  //filename of the announcement
  const filename = __dirname+"/announcements"+id+".txt";
  
  //check if announcement exists on the server
  const exists = fs.existsSync(filename);
  
  //if the announcement doesn't exist, send a 404 not found error 
  //and return so nothing afterwards is run
  if(!exists){return res.status(404).json({success:false, message: "404 not found"});}

  //if it does exist, send it
  res.sendFile(filename);
  
  
});

//listen for requests on the server 
app.listen(process.env.PORT);