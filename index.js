const express = require("express");
const path = require("path");
const generatePassword = require("password-generator");
const bodyParser = require("body-parser");
const app = express();
var cors = require("cors");
var jsforce = require("jsforce");
// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));
app.use(bodyParser.json());
var whitelist = ["localhost:3000", "http://localhost:5000"];
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};
app.use(cors());
// Put all API endpoints under '/api'
app.get("/api/passwords", (req, res) => {
  const count = 5;

  // Generate some passwords
  const passwords = Array.from(Array(count).keys()).map((i) =>
    generatePassword(12, false)
  );

  // Return them as json
  res.json(passwords);

  console.log(`Sent ${count} passwords`);
});

app.post("/api/logincall", function (req, res) {
  var ourl = JSON.parse(JSON.stringify(req.body)).loginUrl;

  var oPath = path.join(
    req.protocol + "://" + req.get("host"),
    "/oauth2/callback"
  );
  console.log("Path", oPath);
  var oauth2 = new jsforce.OAuth2({
    // you can change loginUrl to connect to sandbox or prerelease env.
    loginUrl: "https://" + ourl,
    clientId:
      "3MVG9Rd3qC6oMalXz0DAILIDjZLijXFOCAUXoTzKCcM1xJlQvbjqhwDHz60SAmS8H4ZEDNuNw.VlHp0XwCmqk",
    clientSecret: "8159958206063237947",
    redirectUri: oPath,
  });
  //res.send("Hello");
  res.redirect(
    oauth2.getAuthorizationUrl({ scope: "api id web refresh_token" })
  );
});
// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Password generator listening on ${port}`);
