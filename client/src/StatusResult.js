import React                 from "react";
import "./App.css";
import "./lightning-design/styles/salesforce-lightning-design-system.css";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon        from "@material-ui/core/SvgIcon/SvgIcon";
import Typography            from "@material-ui/core/Typography";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanel        from "@material-ui/core/ExpansionPanel";
import LinearProgress        from '@material-ui/core/LinearProgress';

var Reflux = require("reflux");
var ContentReviewStore = require("./ContentReviewStore.jsx");
var ContentReviewerActions = require("./ContentReviewerActions.jsx");

export default class StatusResult extends Reflux.Component {
    constructor(props) {
        super(props);
        this.store = ContentReviewStore;

    }

    getValueCalculated(Sheetname) {
        var cal;
        if (this.state != undefined && this.state.objectMapping != undefined) {
            cal = ( this.state.objectMapping[Sheetname].sheetUpsertCalled /
                this.state.objectMapping[Sheetname].sheetDataJsonList.length );
        }
        console.log('The CAl', cal);
        return cal;
    }

    render() {
        var SheetNames = [];
        if (this.state != undefined && this.state.sheetsToInsert != undefined) {
            SheetNames = this.state.sheetsToInsert
        }
        return (
            <div>
                {SheetNames.map(value => (
                    <ExpansionPanel>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                            <Typography>
                                {value}
                            </Typography>
                            <LinearProgress variant="buffer" value={this.getValueCalculated(value)}
                                            valueBuffer={this.getValueCalculated(value)}/>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>

                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                ))}

            </div>
        );
    }

}
