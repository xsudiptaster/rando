import {
  fetchDescribe,
  fetchMetadatalist,
  hideSpinner,
  showSpinner,
} from "../actions/action";

import jsforce from "jsforce";
import { store } from "../stores/store";

const parser = require("fast-xml-parser");
const JSZipSync = require("jszip-sync");

function fetchDescribeAPI() {
  store.dispatch(showSpinner());
  var jsobj = new jsforce.Connection();
  jsobj.instanceUrl = localStorage.getItem("instance_url");
  jsobj.accessToken = localStorage.getItem("access_token");
  var types = [
    { type: "CustomObject", folder: null },
    { type: "Profile", folder: null },
    { type: "PermissionSet", folder: null },
  ];
  jsobj.metadata.list(types, "48.0", function (err, res) {
    if (err) {
      console.log(err);
      return;
    }
    console.log("MetadataList", res);
    store.dispatch(fetchMetadatalist(res));
    fetchCustomField(res);
    return res;
  });
}
function fetchCustomField(metadatalist) {
  var jsobj = new jsforce.Connection();
  var profileNames = [];
  var objectNames = [];
  var permissionSetNames = [];
  metadatalist.forEach((ele) => {
    if (ele.fileName.includes(".object")) {
      objectNames.push(ele.fullName);
    } else if (ele.fileName.includes(".profile")) {
      profileNames.push(ele.fullName);
    } else if (ele.fileName.includes(".permissionset")) {
      permissionSetNames.push(ele.fullName);
    }
  });
  jsobj.instanceUrl = localStorage.getItem("instance_url");
  jsobj.accessToken = localStorage.getItem("access_token");
  var reqPck = {};
  reqPck.apiVersion = "48.0";
  reqPck.singlePackage = true;
  var types = [];
  var memberSettings = {};
  memberSettings.name = "CustomObject";
  memberSettings.members = [];
  objectNames.forEach((ele) => {
    memberSettings.members.push(ele);
  });
  types.push(memberSettings);
  var memberSettings2 = {};
  memberSettings2.name = "Profile";
  memberSettings2.members = [];
  profileNames.forEach((ele) => {
    memberSettings2.members.push(ele);
  });
  types.push(memberSettings2);

  var memberSettings3 = {};
  memberSettings3.name = "PermissionSet";
  memberSettings3.members = [];
  permissionSetNames.forEach((ele) => {
    memberSettings3.members.push(ele);
  });
  types.push(memberSettings3);

  reqPck.unpackaged = {
    types: types,
  };
  jsobj.metadata.retrieve(reqPck, function (error, ref) {
    if (error) {
      return;
    } else {
      checkStatusOfXML(ref.id);
    }
  });
}
function checkStatusOfXML(id) {
  var jsobj = new jsforce.Connection();
  jsobj.instanceUrl = localStorage.getItem("instance_url");
  jsobj.accessToken = localStorage.getItem("access_token");
  jsobj.metadata.checkRetrieveStatus(id, function (error, response) {
    if (error) {
      return;
    } else {
      if (response.done === "true") {
        var jssynco = new JSZipSync();
        jssynco
          .loadAsync(response.zipFile, { base64: true })
          .then(function (zip) {
            AsygetXmlConversion(jssynco).then((val) => {
              store.dispatch(hideSpinner());
              store.dispatch(fetchDescribe(val));
            });
          });
      } else {
        setTimeout(checkStatusOfXML, 1000, response.id);
      }
    }
  });
}
async function AsygetXmlConversion(jssynco) {
  var textf = {};
  var MaptoSend = {};
  var keys = Object.keys(jssynco.files);
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    textf = await jssynco.files[key].async("text").then(function (context) {
      return parser.parse(context);
    });
    MaptoSend[key] = textf;
  }
  return MaptoSend;
}
export default fetchDescribeAPI;
