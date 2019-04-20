import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import "./lightning-design/styles/salesforce-lightning-design-system.css";
var Reflux = require("reflux");
var ContentReviewStore = require("./ContentReviewStore.jsx");
var ContentReviewerActions = require("./ContentReviewerActions.jsx");

export default class FileuploadSection extends Reflux.Component {
    constructor(props) {
        mixins: [Reflux.connect(ContentReviewStore, "ContentReviewStore")];
        super(props);
        this.store=ContentReviewStore;
      }

      render(){
         return(
            <div>
            Hello
            </div>
         );   
      }
        

      


}