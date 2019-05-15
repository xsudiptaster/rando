const express = require("express");
const path = require("path");
const jsforce = require("jsforce");
const generatePassword = require("password-generator");
const {parse, stringify} = require('flatted/cjs');

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
    var respt = {};
    respt.sesionTkn=jsobj.accessToken;
    respt.loginUrl = jsobj.instanceUrl;
    res.send(respt);
  });
  // Return them as json
});

// Put all API endpoints under '/api'
app.post("/api/objectList", function(req, res) {
  var jsobj = new jsforce.Connection();
  jsobj.instanceUrl = req.body.oUrl;
  jsobj.accessToken = req.body.sessiontok;
  jsobj.describeGlobal(function(err, response) {
    if (err) {
      return console.error(err);
    }
    res.send((JSON.stringify(response)));
  });
  // Return them as json
});

//Put all API endpoints under '/api'
app.post("/api/objectDescribe", function(req, res) {
  var jsobj = new jsforce.Connection();
  jsobj.instanceUrl = req.body.oUrl;
  jsobj.accessToken = req.body.sessiontok;
  console.log('The ObjectName',req.body.objName);
  jsobj.describe(req.body.objName,function(err, response) {
    if (err) {
      return console.error(err);
    }
    res.send((JSON.stringify(response)));
  });
  // Return them as json
});

//Put all API endpoints under '/api'
app.post("/api/objectUpsert", function (req, res) {
  var jsobj = new jsforce.Connection();
  jsobj.instanceUrl = req.body.oUrl;
  jsobj.accessToken = req.body.sessiontok;
  var objectName = req.body.objectName;
  var externalId = req.body.ExternalName;
    var dataToUpsert = JSON.parse(req.body.dataToUpsert);
  console.log('The data To Insert', dataToUpsert);
    jsobj.sobject(objectName).upsert(dataToUpsert, externalId, function (err, response) {
    if (err) {
        console.log('The Error is this ', err);
      res.send('Error');
    }
      console.res.send(( JSON.stringify(response) ));
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

console.log(`Running started  on ${port}`);

