var Reflux = require('reflux');
var ContentReviewerActions = require('./ContentReviewerActions.js');

var ContentReviewerStore = Reflux.createStore({
 // Shorthand for listening to all ContentReviewerActions
 listenables: ContentReviewerActions,

 data: {},

 // Load a review when the store is initialized
 init: function() {
    data.firstdata= "Hello sud",
    this.trigger(this.data);
 },

 // Clear out the current review and any errors while we load the next review
 loginInSalesforce: function() {
   
 },
});

module.exports = ContentReviewerStore;