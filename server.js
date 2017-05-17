// server dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

var History = require("./models/history");

// Create a new express app
var app = express();

// Sets an initial port. We'll use this later in our listener
// will work deployed or locally
var PORT = process.env.PORT || 3000;

// Run Morgan for Logging
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static("./public"));

mongoose.connect("mongodb://localhost/history");
var db = mongoose.connection;

db.on("error", function(err) {
    console.log("Mongoose Error: ", err);
});

db.once("open", function() {
    console.log("Mongoose connection successful.");
});

// Main "/" Route. This will redirect the user to our rendered React application
app.get("/", function(req, res) {
    res.sendFile(__dirname + "/public/index.html");
});

// This is the route we will send GET requests to retrieve our most recent click data.
// We will call this route the moment our page gets rendered
app.get("/api", function(req, res) {

    // This GET request will search for the latest clickCount
    History.find({}).exec(function(err, doc) {

        if (err) {
            console.log(err);
        }
        else {
            res.send(doc);
        }
    });
});

app.post("/api", function(req, res) {
    var history = req.body.term;

    History.save({
        history: history
    });
});

// Starting our express server
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});