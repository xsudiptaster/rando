import React                 from "react";
import "./App.css";
import "./lightning-design/styles/salesforce-lightning-design-system.css";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon        from "@material-ui/core/SvgIcon/SvgIcon";
import Typography            from "@material-ui/core/Typography";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanel        from "@material-ui/core/ExpansionPanel";

var Reflux = require("reflux");
var ContentReviewStore = require("./ContentReviewStore.jsx");
var ContentReviewerActions = require("./ContentReviewerActions.jsx");

export default class StatusResult extends Reflux.Component {
    constructor(props) {
        super(props);
        this.store = ContentReviewStore;

    }
    render() {
        var SheetNames = [];
        var ObjMapping = {};
        var ErrorLog = {};
        if (this.state != undefined && this.state.sheetsToInsert != undefined) {
            SheetNames = this.state.sheetsToInsert
        }
        if (this.state && this.state.objectMapping) {
            ObjMapping = this.state.objectMapping;
        }
        if (this.state && this.state.ErrorLog) {
            ErrorLog = this.state.ErrorLog;
        }
        return (
            <div>
                {SheetNames.map(value => (
                    <ExpansionPanel>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                            <table>
                                <tr>
                                    <td>
                                        <Typography>
                                            <label className="slds-text-heading_medium">
                                                {value}
                                            </label>
                                        </Typography>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <progress className="slds-progress-bar" value={ObjMapping[value] != undefined
                                                         ? ObjMapping[value].sheetUpsertCalled : 0}
                                                  max={ObjMapping[value] != undefined
                                                       ? ObjMapping[value].sheetDataJsonList.length
                                                       : 0}></progress>
                                    </td>
                                </tr>
                            </table>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <div style={{maxHeight: "400px"}}>
                                <table
                                    className="slds-table_col-bordered slds-table--bordered">
                                    {( ErrorLog[value] != undefined ? ErrorLog[value] : [] ).map((val, key) => (
                                        <tr>
                                            <td className="slds-wrap">
                                                {key}
                                            </td>
                                            <td className="slds-wrap">
                                                {val}
                                            </td>
                                        </tr>
                                    ))}
                                </table>
                            </div>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                ))}

            </div>
        );
    }

}
