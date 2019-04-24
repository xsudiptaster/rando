import React from "react";
import "./App.css";
import "./lightning-design/styles/salesforce-lightning-design-system.css";
import readXlsxFile from "read-excel-file";

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

    readthefile(event) {
        this.setState({
            fileBlob: event.target.files[0]
        });
        readXlsxFile(event.target.files[0], {getSheets: true}).then(data => {
            this.setState({
                sheetNames: data
            });
        });
    }

    isRealtedCheck(event) {
        this.state.isRelated = event.target.value;
    }

    sheetsToInsert(event) {
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
        this.state.questionfordisplay = {display: "none"}
        this.state.objectmappingdisplay = {display: "block"}
        for (var i = 0; i < this.state.sheetsToInsert.length; i++) {
            var maptemp = new Object();
            maptemp.SheetName = this.state.sheetsToInsert[i];
            maptemp.ObjectName = "";
            maptemp.ExtFromSheet = "";
            maptemp.ExtFromObject = "";
            this.state.objectMapping.push(maptemp);
        }
        ContentReviewerActions.stateupdates(this.state);
    }

    render() {
        var rowsdv = [];

        if (this.state && this.state.sheetNames != undefined) {
            for (var i = 0; i < Object.keys(this.state.sheetNames).length; i++) {
                rowsdv.push(this.state.sheetNames[Object.keys(this.state.sheetNames)[i]])
            }
        }
        console.log('Rows', rowsdv);
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
                                               onChange={this.sheetsToInsert.bind()}></input>
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
