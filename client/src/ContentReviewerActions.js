var Reflux = require('reflux');

var ContentReviewerActions = Reflux.createActions({
 // Child actions 'completed' and 'failed' are called by resolution of listenAndPromise
 "loadReview": { children: ['completed', 'failed'] },
 "updateStatus": {},
 "submitReview": {}
});

// Reflux actions can trigger server calls, which we use to load the content to review
ContentReviewerActions.loadReview.listenAndPromise( function() {
 
});

module.exports = ContentReviewerActions;