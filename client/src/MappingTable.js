import React                 from "react";
import "./App.css";
import "./lightning-design/styles/salesforce-lightning-design-system.css";
import ExpansionPanel        from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography            from '@material-ui/core/Typography';
import ExpandMoreIcon        from '@material-ui/icons/ExpandMore';

var Reflux = require("reflux");
var ContentReviewStore = require("./ContentReviewStore.jsx");
var ContentReviewerActions = require("./ContentReviewerActions.jsx");

export default class MappingTable extends Reflux.Component {
    constructor(props) {
        super(props);
        this.store = ContentReviewStore;

    }

    mapfieldAsSelected(value, val, ev) {
        this.state.objectMapping[value].sheetObjectFields[val] = ev.target.value;
        console.log('The State', this.state);
    }
    render() {
        var panls = [];
        var objdesbs = {};
        if (this.state && this.state.objectMapping) {
            panls = Object.keys(this.state.objectMapping);
        }
        if (this.state && this.state.ObjectDesb != undefined) {
            objdesbs = this.state.ObjectDesb
        }
        return (

            <div>
                <div style={{align: "center"}}>
                    <input value="Upsert" type="button" className="slds-button slds-button--neutral"/>
                </div>
                {panls.map(value => (
                    <ExpansionPanel>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                            <Typography>{value}</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Typography>
                                <table className="slds-table slds-table_bordered">
                                    <tr>
                                        <th className="slds-line-height_reset slds-truncate slds-text-heading_medium">
                                            Column Name
                                        </th>
                                        <th className="slds-line-height_reset slds-truncate slds-text-heading_medium">
                                            Field Name
                                        </th>
                                    </tr>
                                    {( this.state && this.state.objectMapping )
                                     ? this.state.objectMapping[value].sheetHeaders.map(val => (
                                            <tr>
                                                <td>
                                                    {val}
                                                </td>
                                                <td>
                                                    <input list={"List3-" + value} style={{width: "200px!"}}
                                                           className="slds-input"
                                                           onChange={this.mapfieldAsSelected.bind(this, value, val)}
                                                    />
                                                    <datalist id={"List3-" + value}>
                                                        {( objdesbs[this.state.objectMapping[value].ObjectName] !=
                                                            undefined &&
                                                            objdesbs[this.state.objectMapping[value].ObjectName].fields !=
                                                            undefined )
                                                         ? objdesbs[this.state.objectMapping[value].ObjectName].fields.map(
                                                                valfld => (
                                                                    <option value={valfld.name}>{valfld.label}</option>
                                                                )) : <option>None</option>}
                                                    </datalist>
                                                </td>
                                            </tr>

                                        )) : <div></div>}
                                </table>
                            </Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                ))}

            </div>
        );
    }
}