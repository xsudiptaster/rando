const express = require('express');
const path = require('path');
const jsforce = require('jsforce');
const generatePassword = require('password-generator');

const app = express();




// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Put all API endpoints under '/api'
app.get('/api/passwords', (req, res) => {
  const count = 5;

  // Generate some passwords
  const passwords = Array.from(Array(count).keys()).map(i =>
    generatePassword(12, false)
  )

  // Return them as json
  res.json(passwords);

  console.log(`Sent ${count} passwords`);
});

// Put all API endpoints under '/api'
app.post('/api/logintosalesforce', function (req, res) {
/* var jsobj= jsforce.Connection();
  jsobj.loginUrl= req.loginUrl;
  sessionreceived= jsobj.login(req.username,req.password);
  // Return them as json
  res.json(sessionreceived);
  console.log(`Sent ${count} passwords`);*/ 
  res.json('Hello this is response'+req.body);
})

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Password generator listening on ${port}`);
