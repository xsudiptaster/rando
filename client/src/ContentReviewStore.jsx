var Reflux = require("reflux");
var ContentReviewerActions = require("./ContentReviewerActions.jsx");

var ContentReviewerStore = Reflux.createStore({
// Shorthand for listening to all ContentReviewerActions
                                                  listenables: [ContentReviewerActions],
                                                  constructor() {

                                                  },
// Load a review when the store is initialized
                                                  init          : function () {
                                                  },
                                                  stateupdates  : function (state) {
                                                      if (!this.firstdata) {
                                                          this.firstdata = {};
                                                      }
                                                      this.firstdata = state;
                                                      this.fireUpdate();
                                                  },
                                                  setvalparam: function (param, val) {
                                                      if (!this.firstdata) {
                                                          this.firstdata = {};
                                                      }
                                                      this.firstdata[param] = {};
                                                      this.firstdata[param] = val;
                                                      this.fireUpdate();
                                                  },

// Clear out the current review and any errors while we load the next review
                                                  describeObject: function (objName, state) {
                                                      if (!this.firstdata) {
                                                          this.firstdata = {};
                                                      }
                                                      this.firstdata = state;
                                                      if (this.firstdata != undefined && this.firstdata.sessiontok !=
                                                          undefined) {

                                                      }

                                                  },
                                                  fireUpdate    : function () {
                                                      this.trigger(this.firstdata);
                                                  },

                                              });

module.exports = ContentReviewerStore;
