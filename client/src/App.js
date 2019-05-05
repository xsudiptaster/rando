import React                 from "react";
import "./App.css";
import "./lightning-design/styles/salesforce-lightning-design-system.css";
import LoginSection          from "./LoginSection.js";
import FileuploadSection     from "./FileuploadSection.js";
import QuestionsForOperation from "./QuestionsForOperation";
import ObjectMapping         from "./ObjectMapping";
import MappingTable          from "./MappingTable";
import Headerdisplay         from "./Headerdisplay";

var Reflux = require("reflux");
var ContentReviewerActions = require("./ContentReviewerActions.jsx");
var ContentReviewerStore = require("./ContentReviewStore.jsx");

class App extends Reflux.Component {
    constructor(props) {
        super();
        ( this.state = {
            logindisplay        : {
                display: "block"
            },
            uploadfiledisplay   : {
                display: "none"
            },
            questionfordisplay  : {
                display: "none"
            },
            objectmappingdisplay: {
                display: "none"
            },
            objectmappingtable  : {
                display: "none"
            },
            errorModal          : {height: '14rem', display: 'none'},
            errorMessage        : "",

        } );
        this.store = ContentReviewerStore;
    }

    handleClose = () => {
        this.setState({errorModal: {height: '14rem', display: 'none'}});
    };

    render() {
        return (
            <div>
                <div>
                    <div className="demo-only">
                        <section role="alertdialog" tabIndex={-1} aria-labelledby="prompt-heading-id"
                                 aria-describedby="prompt-message-wrapper"
                                 className="slds-modal slds-fade-in-open slds-modal_prompt" aria-modal="true">
                            <div className="slds-modal__container">
                                <header className="slds-modal__header slds-theme_error slds-theme_alert-texture">
                                    <button
                                        className="slds-button slds-button_icon slds-modal__close slds-button_icon-inverse"
                                        title="Close">
                                        <svg className="slds-button__icon slds-button__icon_large" aria-hidden="true">
                                            <use xmlnsXlink="http://www.w3.org/1999/xlink"
                                                 xlinkHref="/assets/icons/utility-sprite/svg/symbols.svg#close"/>
                                        </svg>
                                        <span className="slds-assistive-text">Close</span>
                                    </button>
                                    <h2 className="slds-text-heading_medium" id="prompt-heading-id">ERROR</h2>
                                </header>
                                <div className="slds-modal__content slds-p-around_medium" id="prompt-message-wrapper">
                                    <p>Sit nulla est ex deserunt exercitation anim occaecat. Nostrud ullamco deserunt
                                        aute id consequat veniam incididunt duis in sint irure nisi. Mollit officia
                                        cillum Lorem ullamco minim nostrud elit officia tempor esse quis. Cillum sunt ad
                                        dolore
                                        quis aute consequat ipsum magna exercitation reprehenderit magna. Tempor
                                        cupidatat consequat elit dolor adipisicing.</p>
                                </div>
                                <footer className="slds-modal__footer slds-theme_default">
                                    <button className="slds-button slds-button_neutral"
                                            onClick={() => this.handleClose()}>Close
                                    </button>
                                </footer>
                            </div>
                        </section>
                        <div className="slds-backdrop slds-backdrop_open"/>
                    </div>
                </div>

                <div className="slds-grid slds-wrap">
                    <div className="slds-col slds-size_12-of-12">
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
            </div>
        );
    }
}

export default App;
