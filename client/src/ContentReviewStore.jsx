var Reflux = require("reflux");
var ContentReviewerActions = require("./ContentReviewerActions.jsx");
var axios = require("axios");

var ContentReviewerStore = Reflux.createStore({
  // Shorthand for listening to all ContentReviewerActions
  listenables: [ContentReviewerActions],
  constructor() {},
  // Load a review when the store is initialized
  init: function() {},
  stateupdates: function(state) {
    if (!this.firstdata) {
      this.firstdata = {};
    }
    this.firstdata = state;
    this.fireUpdate();
  },
  setvalparam: function(param, val) {
    if (!this.firstdata) {
      this.firstdata = {};
    }
    this.firstdata[param] = {};
    this.firstdata[param] = val;
    this.fireUpdate();
  },

  // Clear out the current review and any errors while we load the next review
  describeObject: function(objName, state) {
    if (!this.firstdata) {
      this.firstdata = {};
    }
    this.firstdata = state;
    if (this.firstdata != undefined && this.firstdata.sessiontok != undefined) {
      axios
        .post("/api/objectDescribe", {
          sessiontok: this.firstdata.sessiontok,
          oUrl: this.firstdata.instanceUrl,
          objName: objName
        })
        .then(response => {
          if (this.firstdata.ObjectDesb == undefined) {
            this.firstdata.ObjectDesb = {};
          }
          this.firstdata.ObjectDesb[response.data.name] = response.data;
          this.fireUpdate();
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  fireUpdate: function() {
    this.trigger(this.firstdata);
  },
  showError:function(ErrorMessage,state){
    if (!this.firstdata) {
      this.firstdata = {};
    }
    this.firstdata = state;
    this.firstdata.errorMessage = "Please Select the Org";
    this.firstdata.errorModal = {height: '14rem', display: 'block'};
    this.fireUpdate();
  }
});

module.exports = ContentReviewerStore;
