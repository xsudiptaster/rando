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

export default class statusResult extends Reflux.Component {
    constructor(props) {
        super(props);
        this.store = ContentReviewStore;

    }

    render() {
        return (
            <div>
                <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                        <Typography>
                            Status Update
                        </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>

                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
        );
    }

}