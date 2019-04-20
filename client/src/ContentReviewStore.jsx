var Reflux = require("reflux");
var ContentReviewerActions = require("./ContentReviewerActions.jsx");

var ContentReviewerStore = Reflux.createStore({
  // Shorthand for listening to all ContentReviewerActions
  listenables: [ContentReviewerActions],
  firstdata: {},
  constructor() {
    
  },
  // Load a review when the store is initialized
  init: function() {
    this.firstdata.logindisplay = {
      visibility: "show"
    };
    this.firstdata.uploadfiledisplay = {
      visibility: "hidden"
    };
    this.fireUpdate();
  },
  stateupdates: function(state) {
    this.firstdata = state;
    console.log("The Store DAta", this.firstdata);
    this.fireUpdate();
  },

  // Clear out the current review and any errors while we load the next review
  loginInSalesforce: function() {},
  fireUpdate:function ()
  {
    this.trigger('change',this.firstdata);
  }

});

module.exports = ContentReviewerStore;
