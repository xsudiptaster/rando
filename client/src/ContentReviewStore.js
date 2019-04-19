var Reflux = require('reflux');
var ContentReviewerActions = require('./ContentReviewerActions.js');

var ContentReviewerStore = Reflux.createStore({
 // Shorthand for listening to all ContentReviewerActions
 listenables: ContentReviewerActions,
 firstdata :{} ,

 // Load a review when the store is initialized
 init: function() {
    this.firstdata.trys= "Hello sud";
    this.trigger(this.firstdata);
 },
 updateUserName : function(data){

 },
 updatePassword: function(data){

 },
 updateComponentDisplay: function(data){

 },
 // Clear out the current review and any errors while we load the next review
 loginInSalesforce: function() {
   
 },
});

module.exports = ContentReviewerStore;