var Reflux = require('reflux');
var ContentReviewerActions = require('./ContentReviewerActions.js');

var ContentReviewerStore = Reflux.createStore({
 // Shorthand for listening to all ContentReviewerActions
 listenables: ContentReviewerActions,
 listeners: ContentReviewerActions,
 firstdata :{} ,

 // Load a review when the store is initialized
 init: function() {
    this.firstdata.logindisplay={
        visibility: "show"
    };
    this.firstdata.uploadfiledisplay={
        visibility: "hidden"
    };
    this.trigger(this.firstdata);
 },
 onstateupdates : function(state){
    this.firstdata=state;
    console.log('Updated State',this.firstdata);
    this.trigger(this.firstdata);
 },
 // Clear out the current review and any errors while we load the next review
 loginInSalesforce: function() {
   
 },
});

module.exports = ContentReviewerStore;