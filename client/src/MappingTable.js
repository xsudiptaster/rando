import React                         from "react";
import "./App.css";
import "./lightning-design/styles/salesforce-lightning-design-system.css";
import { Accordion, AccordionPanel } from "@salesforce/design-system-react";

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
                <Accordion>
                    <AccordionPanel>
                        Hello
                    </AccordionPanel>
                </Accordion>
            </div> );
    }
}