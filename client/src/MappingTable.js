import React                 from "react";
import "./App.css";
import "./lightning-design/styles/salesforce-lightning-design-system.css";
import ExpansionPanel        from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography            from '@material-ui/core/Typography';

var Reflux = require("reflux");
var ContentReviewStore = require("./ContentReviewStore.jsx");
var ContentReviewerActions = require("./ContentReviewerActions.jsx");



export default class MappingTable extends Reflux.Component {
    constructor(props) {
        super(props);
        this.store = ContentReviewStore;

    }



    render() {
        var panls = [];
        if (this.state && this.state.objectMapping) {
            panls = Object.keys(this.state.objectMapping);
        }

        return (
            <div>
                {panls.map(value => (
                    <ExpansionPanel>
                        <ExpansionPanelSummary>
                            <Typography>{value}</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Typography>
                                <table>
                                    <tr>
                                        <th>
                                            Column Name
                                        </th>
                                        <th>
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