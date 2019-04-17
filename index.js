const express = require('express');
const path = require('path');
const jsforce = require('jsforce');
const generatePassword = require('password-generator');

const app = express();
// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Put all API endpoints under '/api'
app.get('/api/passwords', (req, res) => {
  const count = 5;

  // Generate some passwordss
  const passwords = Array.from(Array(count).keys()).map(i =>
    generatePassword(12, false)
  )

  // Return them as json
  res.json(passwords);

  console.log(`Sent ${count} passwords`);
});

// Put all API endpoints under '/api'
app.post('/api/logintosalesforce', function (req, res) {
  var jsobj= jsforce.Connection({loginUrl: req.body.loginUrl});
  console.log('Jsforce object',jsobj);
  jsobj.login(req.body.username,req.body.password,function(err,userinfo){
    if (err) { return console.error(err); }
    res.json(jsobj);
  } );
  // Return them as json
  
})

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Password generator listening on ${port}`);
