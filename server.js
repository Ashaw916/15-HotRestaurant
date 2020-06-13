// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
var fs = require("fs");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let tableData = [];
let waitlistData = [];
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});
app.get("/reserve", function (req, res) {
  res.sendFile(path.join(__dirname, "reserve.html"));
});
app.get("/tables", function (req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
});
app.get("/api/tables", function (req, res) {
  return res.json(tableData);
});
app.get("/api/waitlist", function (req, res) {
  return res.json(waitlistData);
});
app.post("/api/clear", function (req, res) {
    tableData = [];
    waitlistData = [];
  });
// Create New Characters - takes in JSON input
app.post("/api/tables", function (req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    let newTable = req.body;
    console.log(newTable);
    if (tableData.length < 5) {
      tableData.push(newTable);
      res.json(newTable);
    } else {
      waitlistData.push(newTable);
      res.json(newTable);
    }
  });

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });