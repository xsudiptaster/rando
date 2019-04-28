const express = require("express");
const path = require("path");
const jsforce = require("jsforce");
const generatePassword = require("password-generator");

const app = express();
// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));

// Put all API endpoints under '/api'
app.get("/api/passwords", (req, res) => {
  const count = 5;

  // Generate some passwordss
  const passwords = Array.from(Array(count).keys()).map(i =>
    generatePassword(12, false)
  );

  // Return them as json
  res.json(passwords);

  console.log(`Sent ${count} passwords`);
});

// Put all API endpoints under '/api'
app.post("/api/logintosalesforce", function(req, res) {
  var jsobj = new jsforce.Connection();
  jsobj.loginUrl = req.body.loginUrl;

  jsobj.login(req.body.username, req.body.password, function(err, userinfo) {
    if (err) {
      return console.error(err);
    }
    var respt={}
    respt.sesionTkn=jsobj.accessToken;
    respt.loginUrl=jsobj.instanceUrl
    res.send(respt);
  });
  // Return them as json
});

// Put all API endpoints under '/api'
app.post("/api/objectList", function(req, res) {
  var jsobj = new jsforce.Connection();
  console.log('The datatoken',req.body);
  jsobj.instanceUrl = req.body.oUrl;
  jsobj.accessToken = req.body.sessiontok;
  jsobj.describeGlobal(function(err, userinfo) {
    if (err) {
      return console.error(err);
    }
    console.log("List object", jsobj);
    res.send(this.stringyfyJson(jsobj));
  });
  // Return them as json
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Password generator listening on ${port}`);
stringyfyJson: function(obj)
{
  var cache = [];
JSON.stringify(obj, function(key, value) {
    if (typeof value === 'object' && value !== null) {
        if (cache.indexOf(value) !== -1) {
            // Duplicate reference found
            try {
                // If this value does not reference a parent it can be deduped
                return JSON.parse(JSON.stringify(value));
            } catch (error) {
                // discard key if value cannot be deduped
                return;
            }
        }
        // Store value in our collection
        cache.push(value);
    }
    return value;
});
cache = null;
}

