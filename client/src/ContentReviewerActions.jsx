var Reflux = require('reflux');
var ContentReviewerActions = Reflux.createActions([
 // Child actions 'completed' and 'failed' are called by resolution of listenAndPromise
 "loginInSalesforce",
 "stateupdates", 
 "setvalparam",
]);
module.exports = ContentReviewerActions;