var Reflux = require("reflux");
var ContentReviewerActions = require("./ContentReviewerActions.jsx");

var ContentReviewerStore = Reflux.createStore({
  // Shorthand for listening to all ContentReviewerActions
  listenables: [ContentReviewerActions],
  constructor() {
    
  },
  // Load a review when the store is initialized
  init: function() {
  },
  stateupdates: function(state) {
    if(!this.firstdata)
    {
        this.firstdata={};
    }
    this.firstdata = state;
    console.log('thedata ',this.firstdata);
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
