import React from "react";
import "./App.css";
import "./lightning-design/styles/salesforce-lightning-design-system.css";

var Reflux = require("reflux");
var ContentReviewStore = require("./ContentReviewStore.jsx");
var ContentReviewerActions = require("./ContentReviewerActions.jsx");

export default class FileuploadSection extends Reflux.Component {
    constructor(props) {
        super(props);
        this.store = ContentReviewStore;
        this.setState({
            isRelated: false
        });
    }

    isRealtedCheck(event) {
        this.state.isRelated = event.target.value;
    }

    sheetsToInsertfn(event) {
        if (event.target.checked) {
            if (this.state.sheetsToInsert && this.state.sheetsToInsert.indexOf(event.target.value) == -1) {
                this.state.sheetsToInsert.push(event.target.value);
            } else {
                this.state.sheetsToInsert = [];
                this.state.sheetsToInsert.push(event.target.value);
            }
        } else {
            if (this.state.sheetsToInsert && this.state.sheetsToInsert.indexOf(event.target.value) != -1) {
                this.state.sheetsToInsert.splice(this.state.sheetsToInsert.indexOf(event.target.value), 1);
            }

        }
    }

    gotoObjectMapping() {
        if (this.state.sheetsToInsert != undefined) {
            this.state.objectMapping = [];
            for (var i = 0; i < this.state.sheetsToInsert.length; i++) {
                var maptemp = {};
                maptemp[this.state.sheetsToInsert[i]].ObjectName = "";
                maptemp[this.state.sheetsToInsert[i]].ExtFromSheet = "";
                maptemp[this.state.sheetsToInsert[i]].ExtFromObject = "";
                maptemp[this.state.sheetsToInsert[i]].sheetHeaders = [];
                maptemp[this.state.sheetsToInsert[i]].sheetObjectFields = [];
                this.state.objectMapping.push(maptemp);
            }

        } else {
            alert("Select a Sheet at least");
            return;
        }
        this.state.questionfordisplay = {display: "none"}
        this.state.objectmappingdisplay = {display: "block"}
        ContentReviewerActions.stateupdates(this.state);
    }

    render() {
        var rowsdv = [];

        if (this.state && this.state.sheetNames != undefined) {
            for (var i = 0; i < Object.keys(this.state.sheetNames).length; i++) {
                rowsdv.push(this.state.sheetNames[Object.keys(this.state.sheetNames)[i]])
            }
        }
        return (
            <div>
                <div>
                    <article className="slds-card">
                        <div className="slds-card__header slds-grid">
                            <table>
                                <tr>
                                    <td>
                                        <div className="slds-media__body">
                                            <h2 className="slds-card__header-title">
                                                <a
                                                    href="javascript:void(0);"
                                                    className="slds-card__header-link slds-truncate"
                                                    title="Accounts"
                                                >
                                                    <span>Are the Sheets Related ?</span>
                                                </a></h2>
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            <input
                                                type="checkbox"
                                                className="slds-checkbox"
                                                onChange={this.isRealtedCheck.bind(this)}
                                            />

                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div className="slds-media__body">
                                            <h2 className="slds-card__header-title">
                                                <a
                                                    href="javascript:void(0);"
                                                    className="slds-card__header-link slds-truncate"
                                                    title="Accounts"
                                                >
                                                    <span>Sheets to Insert ?</span>
                                                </a>
                                            </h2>
                                        </div>
                                    </td>
                                </tr>


                                {rowsdv.map(value => <tr>
                                    <td>
                                        <label className="slds-text-body_small">{value}</label></td>
                                    <td>
                                        <input type="checkbox" value={value}
                                               onChange={this.sheetsToInsertfn.bind(this)}></input>
                                    </td>
                                </tr>)}


                            </table>

                        </div>
                        <input type="button" value="Proceed to Object Mapping"
                               className="slds-button slds-button_neutral"
                               onClick={() => this.gotoObjectMapping()}
                        />
                    </article>

                </div>

            </div>
        );
    }
}
