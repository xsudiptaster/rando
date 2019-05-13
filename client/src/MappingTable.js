import React                 from "react";
import "./App.css";
import "./lightning-design/styles/salesforce-lightning-design-system.css";
import ExpansionPanel        from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography            from '@material-ui/core/Typography';
import ExpandMoreIcon        from '@material-ui/icons/ExpandMore';
import CircularProgress      from "@material-ui/core/CircularProgress";
import $                     from 'jquery'
import XLSX                  from 'xlsx';

var Reflux = require("reflux");
var ContentReviewStore = require("./ContentReviewStore.jsx");
var ContentReviewerActions = require("./ContentReviewerActions.jsx");

export default class MappingTable extends Reflux.Component {
    constructor(props) {
        super(props);
        this.store = ContentReviewStore;

    }

    mapfieldAsSelected(SheetName, SheetHeader, ev) {
        this.mapFieldsAsSelectedUpdate(SheetName, SheetHeader, ev.target.value);
    }

    mapFieldsAsSelectedUpdate(SheetName, SheetHeader, FieldApi) {
        this.state.objectMapping[SheetName].sheetObjectFields[SheetHeader] = {};
        this.state.objectMapping[SheetName].sheetObjectFields[SheetHeader]["FieldName"] = FieldApi;
        for (var i = 0; i < this.state.ObjectDesb[this.state.objectMapping[SheetName].ObjectName].fields.length; i++) {
            if (this.state.ObjectDesb[this.state.objectMapping[SheetName].ObjectName].fields[i].name ==
                FieldApi &&
                this.state.ObjectDesb[this.state.objectMapping[SheetName].ObjectName].fields[i].type == 'reference') {
                this.state.objectMapping[SheetName].sheetObjectFields[SheetHeader]["ExterId"] = "";
                this.state.objectMapping[SheetName].sheetObjectFields[SheetHeader]["ObjectName"] =
                    this.state.ObjectDesb[this.state.objectMapping[SheetName].ObjectName].fields[i].referenceTo[0];
                this.state.objectMapping[SheetName].sheetObjectFields[SheetHeader]["RelationName"] =
                    this.state.ObjectDesb[this.state.objectMapping[SheetName].ObjectName].fields[i].relationshipName;
                if (this.state == undefined || this.state.ObjectDesb == undefined ||
                    this.state.ObjectDesb[this.state.ObjectDesb[this.state.objectMapping[SheetName].ObjectName].fields[i].referenceTo[0]] ==
                    undefined) {
                    ContentReviewerActions.describeObject(
                        this.state.ObjectDesb[this.state.objectMapping[SheetName].ObjectName].fields[i].referenceTo[0],
                        this.state);
                }

            }
        }
        ContentReviewerActions.stateupdates(this.state);
    }
    mapfieldWhenExternalId(SheetName, SheetHeader, ev) {
        this.state.objectMapping[SheetName].sheetObjectFields[SheetHeader]["ExterId"] = ev.target.value;
        ContentReviewerActions.stateupdates(this.state);
    }

    onClickUpsert() {
        if (this.state.isParallel) {
            for (var i = 0; i < this.state.sheetsToInsert.length; i++) {
                var jsonstr = this.createTheRequestJson(this.state.sheetsToInsert[i]);
                console.log('The JSon Create', jsonstr);
            }
        }

    }

    createTheRequestJson(SheetName) {
        if (this.state.objectMapping != undefined) {
            var sheetParam = this.state.objectMapping[SheetName];
            var JsonBuilt = {};
            var listData = [];
            var headerMapped = Object.keys(sheetParam.sheetObjectFields);
            var JsonSheet = XLSX.utils.sheet_to_json(this.state.workbook.Sheets[SheetName]);
            for (var k = 0; k < JsonSheet.length; k++) {
                var obj = {};
                for (var i = 0; i < headerMapped.length; i++) {
                    var stateHeaderObject = sheetParam.sheetObjectFields[headerMapped[i]];
                    if (stateHeaderObject.FieldName != undefined &&
                        stateHeaderObject.FieldName != "") {
                        if (stateHeaderObject.RelationName != undefined && stateHeaderObject.RelationName != "" &&
                            stateHeaderObject.ExterId != undefined && stateHeaderObject.ExterId != "") {
                            var InnerObj = {};
                            InnerObj[sheetParam.sheetObjectFields[headerMapped[i]].ExterId] =
                                JsonSheet[k][headerMapped[i]];
                            obj[sheetParam.sheetObjectFields[headerMapped[i]].RelationName] = InnerObj;
                        }
                        else {
                            obj[sheetParam.sheetObjectFields[headerMapped[i]].FieldName] =
                                JsonSheet[k][headerMapped[i]];
                        }

                    }
                }
                listData.push(obj);
            }
            return JSON.stringify(listData);
        }
    }

    autoMatch() {
        var sheetNames = Object.keys(this.state.objectMapping);
        for (var i = 0; i < sheetNames.length; i++) {
            var objName = this.state.objectMapping[sheetNames[i]].ObjectName;
            for (var j = 0; j < this.state.objectMapping[sheetNames[i]].sheetHeaders.length; j++) {
                var sheetHeader = this.state.objectMapping[sheetNames[i]].sheetHeaders[j];
                for (var k = 0; k < this.state.ObjectDesb[objName].fields.length; k++) {
                    var field = this.state.ObjectDesb[objName].fields[k];
                    if (field.label.indexOf(sheetHeader) > -1 || field.name.indexOf(sheetHeader) > -1) {
                        this.mapFieldsAsSelectedUpdate(sheetNames[i], sheetHeader, field.name);
                        $(this.refs['select-' + sheetNames[i] + '-' + sheetHeader]).val(field.name);
                    }
                }
            }
        }
    }
    render() {
        var panls = [];
        var objdesbs = {};
        var extrDesbs = {};
        var Headers = {};
        if (this.state && this.state.objectMapping != undefined) {
            panls = Object.keys(this.state.objectMapping);
            for (var l = 0; l < panls.length; l++) {
                if (( this.state.objectMapping[panls[l]].ExtFromSheet !=
                    "" && this.state.objectMapping[panls[l]].ExtFromSheet != undefined )) {
                    Headers[panls[l]] = this.state.objectMapping[panls[l]].sheetHeaders;

                    Headers[panls[l]].splice(
                        Headers[panls[l]].indexOf(this.state.objectMapping[panls[l]].ExtFromSheet), 1);
                }
            }

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
        }

        return (

            <div>
                <table>
                    <tr>
                        <td>
                            <div>
                                <input value="Upsert" type="button" className="slds-button slds-button--neutral"
                                       onClick={() => this.onClickUpsert()}/>
                            </div>
                        </td>
                        <td>
                            <div>
                                <input value="Auto Match" type="button" className="slds-button slds-button--neutral"
                                       onClick={() => this.autoMatch()}/>
                            </div>
                        </td>
                    </tr>
                </table>


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
                                        <th className="slds-line-height_reset slds-truncate slds-text-heading_medium">
                                            External Id(Default is Id)
                                        </th>
                                    </tr>
                                    {( this.state && this.state.objectMapping && Headers[value] != undefined )
                                     ? Headers[value].map(val => (
                                                <tr>
                                                <td>
                                                    {val}
                                                </td>
                                                <td>
                                                    <input list={"List3-" + value} style={{width: "200px!"}}
                                                           className="slds-input"
                                                           ref={'select' + '-' + value + '-' + val}
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
                                                    <div style={{
                                                        display: ( this.state.objectMapping[value].sheetObjectFields !=
                                                                   undefined &&
                                                                   this.state.objectMapping[value].sheetObjectFields[val] !=
                                                                   undefined &&
                                                                   this.state.objectMapping[value].sheetObjectFields[val].ObjectName !=
                                                                   undefined &&
                                                                   extrDesbs[this.state.objectMapping[value].sheetObjectFields[val].ObjectName] ==
                                                                   undefined ? "block" : "none" )
                                                    }}>
                                                        <CircularProgress style={{
                                                            position: "absolute", top: "30%", left: "30%",
                                                            width: "17px", height: "17px",
                                                            zIndex                                : "10"

                                                        }}/>

                                                    </div>

                                                        <input list={"List4-" + value + '-' + val} style={{width: "200px!"}}
                                                               className="slds-input"
                                                               onChange={this.mapfieldWhenExternalId.bind(this, value,
                                                                                                          val)}
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