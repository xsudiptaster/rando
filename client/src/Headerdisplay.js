import React, { Component } from "react"
import "./App.css"
import axios from "axios"
import "./lightning-design/styles/salesforce-lightning-design-system.css";

export class Headerdisplay extends Component {
    
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.state.loginurl = "https://test.salesforce.com";
      }
    render(){
        return(
            <div> Hello Imported DOne</div>
        )
    }    
}
