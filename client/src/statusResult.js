import React from "react";
import "./App.css";
import "./lightning-design/styles/salesforce-lightning-design-system.css";

var Reflux = require("reflux");
var ContentReviewStore = require("./ContentReviewStore.jsx");
var ContentReviewerActions = require("./ContentReviewerActions.jsx");

export default class statusResult extends Reflux.Component {
    constructor(props) {
        super(props);
        this.store = ContentReviewStore;

    }

}