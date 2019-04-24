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

    render() {
        var rowsdv = [];
        if (this.state && this.state.sheetNames != undefined) {
            rowsdv.push(this.state.sheetNames);
            console.log('this.state', this.state);
        }
        console.log('Rows', rowsdv);
        return (
            <div>
                <div>
                    <article className="slds-card">
                        <div className="slds-card__header slds-grid">
                            <table className="slds-table">
                                <tr>
                                    <td>
                                        <div className="slds-media__body">
                                            <h2 className="slds-card__header-title">
                                                <input
                                                    type="checkbox"
                                                    className="slds-checkbox"
                                                    onChange={this.isRealtedCheck.bind(this)}
                                                />
                                                &nbsp;&nbsp;
                                                <a
                                                    href="javascript:void(0);"
                                                    className="slds-card__header-link slds-truncate"
                                                    title="Accounts"
                                                >
                                                    <span>Are the Sheets Related ?</span>
                                                </a>
                                            </h2>
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
                                        <div>Sheet A</div>
                                        <div>Sheet B</div>
                                        <ul>
                                            {rowsdv.map((value, index) => {
                                                return <li key={index}>{value}</li>
                                            })}
                                        </ul>
                                    </td>
                                </tr>
                            </table>
                            <br/>
                            <br/>
                        </div>
                    </article>
                </div>
            </div>
        );
    }
}
