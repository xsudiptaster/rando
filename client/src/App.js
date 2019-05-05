import React                 from "react";
import "./App.css";
import "./lightning-design/styles/salesforce-lightning-design-system.css";
import Headerdisplay         from "./Headerdisplay.js";
import LoginSection          from "./LoginSection.js";
import FileuploadSection     from "./FileuploadSection.js";
import QuestionsForOperation from "./QuestionsForOperation";
import ObjectMapping         from "./ObjectMapping";
import MappingTable          from "./MappingTable";
import Snackbar              from '@material-ui/core/Snackbar';
import SnackbarContent       from '@material-ui/core/SnackbarContent';

var Reflux = require("reflux");
var ContentReviewerActions = require("./ContentReviewerActions.jsx");
var ContentReviewerStore = require("./ContentReviewStore.jsx");

class App extends Reflux.Component {
    constructor(props) {
        super();
        (this.state = {
            logindisplay: {
                display: "block"
            },
            uploadfiledisplay: {
                display: "none"
            },
            questionfordisplay: {
                display: "none"
            },
            objectmappingdisplay: {
                display: "none"
            },
            objectmappingtable: {
                display: "none"
            },

        });
        this.store = ContentReviewerStore;
    }

    // Fetch passwords after first mount
    componentDidMount() {
    }

    render() {
        return (
            <div className="slds-grid slds-wrap">
                <div className="slds-col slds-size_12-of-12">
                    <Snackbar>
                        <SnackbarContent>
                            Hello
                        </SnackbarContent>
                    </Snackbar>
                    <Headerdisplay/>
                </div>
                <br/>
                <br/>
                <br/>
                <br/>
                <div className="slds-col slds-size_1-of-5">
          <span>
          </span>
                </div>
                <div className="slds-col slds-size_3-of-5">
                    <div style={this.state.logindisplay}>
                        <LoginSection/>
                    </div>
                    <div style={this.state.uploadfiledisplay}>
                        <FileuploadSection/>
                    </div>
                    <div style={this.state.questionfordisplay}>
                        <QuestionsForOperation/>
                    </div>
                    <div style={this.state.objectmappingdisplay}>
                        <ObjectMapping/>
                    </div>
                    <div style={this.state.objectmappingtable}>
                        <MappingTable/>
                    </div>
                </div>
                <div className="slds-col slds-size_1-of-5">
                    <span></span>
                </div>
            </div>
        );
    }
}

export default App;
