import React                 from "react";
import "./App.css";
import "./lightning-design/styles/salesforce-lightning-design-system.css";
import ExpansionPanel        from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography            from '@material-ui/core/Typography';
import ExpandMoreIcon        from '@material-ui/icons/ExpandMore';
import SvgIcon               from '@material-ui/core/SvgIcon';

var Reflux = require("reflux");
var ContentReviewStore = require("./ContentReviewStore.jsx");
var ContentReviewerActions = require("./ContentReviewerActions.jsx");

export default class MappingTable extends Reflux.Component {
    constructor(props) {
        super(props);
        this.store = ContentReviewStore;

    }

    mapfieldAsSelected(value, val, ev) {
        if (this.state.objectMapping[value].sheetObjectFields[val] == undefined) {
            this.state.objectMapping[value].sheetObjectFields[val] = {};
        }
        this.state.objectMapping[value].sheetObjectFields[val]["FieldName"] = ev.target.value;
        for (var i = 0; i < this.state.ObjectDesb[this.state.objectMapping[value].ObjectName].fields.length; i++) {
            if (this.state.ObjectDesb[this.state.objectMapping[value].ObjectName].fields[i].name == ev.target.value &&
                this.state.ObjectDesb[this.state.objectMapping[value].ObjectName].fields[i].type == 'reference') {
                this.state.objectMapping[value].sheetObjectFields[val]["ExterId"] = "";
                this.state.objectMapping[value].sheetObjectFields[val]["ObjectName"] =
                    this.state.ObjectDesb[this.state.objectMapping[value].ObjectName].fields[i].referenceTo[0];
                this.state.objectMapping[value].sheetObjectFields[val]["RelationName"] =
                    this.state.ObjectDesb[this.state.objectMapping[value].ObjectName].fields[i].relationshipName;
                if (this.state == undefined || this.state.ObjectDesb == undefined ||
                    this.state.ObjectDesb[this.state.ObjectDesb[this.state.objectMapping[value].ObjectName].fields[i].referenceTo[0]] ==
                    undefined) {
                    ContentReviewerActions.describeObject(
                        this.state.ObjectDesb[this.state.objectMapping[value].ObjectName].fields[i].referenceTo[0],
                        this.state);
                }
            }
        }
        console.log('The State', this.state);
    }
    render() {
        var panls = [];
        var objdesbs = {};
        var extrDesbs = {};
        if (this.state && this.state.objectMapping) {
            panls = Object.keys(this.state.objectMapping);
        }
        if (this.state && this.state.ObjectDesb != undefined) {
            objdesbs = this.state.ObjectDesb

        }
        if (this.state && this.state.ObjectDesb != undefined) {
            for (var i = 0; i < Object.keys(this.state.ObjectDesb).length; i++) {
                extrDesbs[Object.keys(this.state.ObjectDesb)[i]] = [];
                for (var j = 0; j < this.state.ObjectDesb[Object.keys(this.state.ObjectDesb)[i]].fields.length; j++) {
                    if (this.state.ObjectDesb[Object.keys(this.state.ObjectDesb)[i]].fields[j].externalId == true ||
                        this.state.ObjectDesb[Object.keys(this.state.ObjectDesb)[i]].fields[j].name == 'Id') {
                        extrDesbs[Object.keys(this.state.ObjectDesb)[i]].push(
                            this.state.ObjectDesb[Object.keys(this.state.ObjectDesb)[i]].fields[j]);
                    }
                }
            }
            console.log('The ExternalId', extrDesbs);
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
                                                <td style={{
                                                    display: ( this.state.objectMapping[value].sheetObjectFields !=
                                                               undefined &&
                                                               this.state.objectMapping[value].sheetObjectFields[val] !=
                                                               undefined &&
                                                               this.state.objectMapping[value].sheetObjectFields[val].ObjectName !=
                                                               undefined ? "block" : "none" )
                                                }}>
                                                    <input list={"List4-" + value + '-' + val} style={{width: "200px!"}}
                                                           className="slds-input"
                                                           onChange={this.mapfieldAsSelected.bind(this, value, val)}
                                                    />
                                                    <datalist id={"List4-" + value + '-' + val}>
                                                        {( this.state.objectMapping[value].sheetObjectFields !=
                                                            undefined &&
                                                            this.state.objectMapping[value].sheetObjectFields[val] !=
                                                            undefined &&
                                                            this.state.objectMapping[value].sheetObjectFields[val].ObjectName !=
                                                            undefined &&
                                                            extrDesbs[this.state.objectMapping[value].sheetObjectFields[val].ObjectName] !=
                                                            undefined )
                                                         ? extrDesbs[this.state.objectMapping[value].sheetObjectFields[val].ObjectName].map(
                                                                valfld => (
                                                                    <option value={valfld.name}>{valfld.label}</option>
                                                                )) : <option>None</option>}
                                                    </datalist>
                                                    <div style={{
                                                        width     : "10px",
                                                        height    : "10px",
                                                        position  : "absolute", /* to align it to right and positon it over the input */
                                                        top       : 0,
                                                        right     : 0,
                                                        background: "lightgrey"
                                                    }}></div>
                                                    <SvgIcon fontSize="10px" color="primary">
                                                        <path
                                                            d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z"/>
                                                    </SvgIcon>
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