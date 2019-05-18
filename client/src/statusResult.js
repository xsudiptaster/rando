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
        if (this.state.sheetsToInsert != undefined) {
            SheetNames = this.state.sheetsToInsert
        }
        return (
            <div>
                Hello
                {SheetNames.map(value => (
                    <ExpansionPanel>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                            <Typography>
                                {value}
                            </Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>

                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                ))}

            </div>
        );
    }

}