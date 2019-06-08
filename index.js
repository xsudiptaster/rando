const express = require("express");
const path = require("path");
const jsforce = require("jsforce");
const generatePassword = require("password-generator");
const crypto = require("simple-crypto-js");
const { Client } = require("pg");

const app = express();
// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));

// Put all API endpoints under '/api'
app.post("/api/logintosalesforce", function(req, res) {
	console.log("Environ Values", process.env.DATABASE_URL);
	var jsobj = new jsforce.Connection();
	jsobj.loginUrl = req.body.loginUrl;
	jsobj.login(req.body.username, req.body.password, function(err, userinfo) {
		if (err) {
			res.send(err.toString());
		} else {
			var respt = {};
			console.log("The UserInfo", userinfo);
			respt.sesionTkn = jsobj.accessToken;
			respt.loginUrl = jsobj.instanceUrl;
			respt.userId = userinfo.id;
			res.send(respt);
		}
	});
	// Return them as json
});

app.post("/api/getTableNames", function(req, res) {
	var client = new Client({
		connectionString: process.env.DATABASE_URL,
		ssl: true,
	});
	client.connect();
	client.query(
		"SELECT table_schema,table_name FROM information_schema.tables Where table_schema='salesforce';",
		(err, res) => {
			if (err) throw err;
			for (let row of res.rows) {
				console.log(JSON.stringify(row));
			}
			client.end();
		},
	);
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
		res.send(JSON.stringify(response));
	});
	// Return them as json
});
// Put all API endpoints under '/api'
app.post("/api/encrypto", function(req, res) {
	var encrypted = crypto.encrypt(req.body.str, "HU5QE4QS");
	res.send(encrypted);
});

app.post("/api/decrypto", function(req, res) {
	var encrypted = crypto.decrypt(req.body.str, "HU5QE4QS");
	res.send(encrypted);
});

//Put all API endpoints under '/api'
app.post("/api/objectDescribe", function(req, res) {
	var jsobj = new jsforce.Connection();
	jsobj.instanceUrl = req.body.oUrl;
	jsobj.accessToken = req.body.sessiontok;
	console.log("The ObjectName", req.body.objName);
	jsobj.describe(req.body.objName, function(err, response) {
		if (err) {
			return console.error(err);
		}
		res.send(JSON.stringify(response));
	});
	// Return them as json
});

//Put all API endpoints under '/api'
app.post("/api/objectUpsert", function(req, res) {
	var jsobj = new jsforce.Connection();
	jsobj.instanceUrl = req.body.oUrl;
	jsobj.accessToken = req.body.sessiontok;
	var objectName = req.body.objectName;
	var externalId = req.body.ExternalName;
	var dataToUpsert = JSON.parse(req.body.dataToUpsert);
	jsobj.sobject(objectName).upsert(dataToUpsert, externalId, function(err, response) {
		if (err) {
			console.log("The Error is this ", err);
			res.send("Error");
		}
		res.send(JSON.stringify(response));
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
