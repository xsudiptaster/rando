import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import "./lightning-design/styles/salesforce-lightning-design-system.css";
var Reflux = require("reflux");
var ContentReviewStore = require("./ContentReviewStore.js");
var ContentReviewerActions = require("./ContentReviewerActions.jsx");

export default class FileuploadSection extends Component {
    constructor(props) {
        mixins: [Reflux.connect(ContentReviewStore, "ContentReviewStore")];
        super(props);
        this.state=ContentReviewStore.firstdata;
      }

      render(){
         return(
            <div>
            Hello
            </div>
         );   
      }
        

      


}