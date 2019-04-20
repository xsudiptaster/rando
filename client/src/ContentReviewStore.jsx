var Reflux = require("reflux");
var ContentReviewerActions = require("./ContentReviewerActions.jsx");

var ContentReviewerStore = Reflux.createStore({
  // Shorthand for listening to all ContentReviewerActions
  listenables: [ContentReviewerActions],
  firstdata: {logindisplay:{
      visibility: "hidden"
  }},
  constructor() {
    
  },
  // Load a review when the store is initialized
  init: function() {
    
  },
  stateupdates: function(state) {
    this.firstdata = state;
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
