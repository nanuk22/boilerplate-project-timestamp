// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function(req, res) {
  res.json({ greeting: 'hello API' });
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});

app.get("/api/:date?", function(req, res) {
  let date = req.params.date;
  if (Date.parse(date)) {
    req.timeStr = new Date(date).toUTCString();
    req.timeMs = new Date(date).getTime();
    return res.json({ "unix": req.timeMs, "utc": req.timeStr });
  }


  if (Number(date)) {
    const dateMs = Number(date);
    req.timeStr = new Date(dateMs).toUTCString();
    req.timeMs = new Date(dateMs).getTime();
    return res.json({ "unix": req.timeMs, "utc": req.timeStr });
  }

  if (date === undefined) {
    req.timeStr = new Date().toUTCString();
    req.timeMs = new Date().getTime();
    return res.json({ "unix": req.timeMs, "utc": req.timeStr });
  } else {
    return res.json({ error: "Invalid Date" });
  }
});

