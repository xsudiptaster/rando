import React              from "react";
import "./App.css";
import "./lightning-design/styles/salesforce-lightning-design-system.css";
import SLDSAccordion      from '@salesforce';
import SLDSAccordionpanel from '@salesforce';

var Reflux = require("reflux");
var ContentReviewStore = require("./ContentReviewStore.jsx");
var ContentReviewerActions = require("./ContentReviewerActions.jsx");

export default class MappingTable extends Reflux.Component {
    constructor(props) {
        super(props);
        this.store = ContentReviewStore;
    }

    render() {
        return (
            <div>
                <SLDSAccordion>
                    <SLDSAccordionpanel>
                        Hello
                    </SLDSAccordionpanel>
                </SLDSAccordion>
            </div> );
    }
}