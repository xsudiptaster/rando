import React from "react";
import "./App.css";
import "./lightning-design/styles/salesforce-lightning-design-system.css";

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
                <ul className="slds-accordion">
            <li className="slds-accordion__list-item">
                <section className="slds-accordion__section slds-is-open">
                    <div className="slds-accordion__summary">
                        <h3 className="slds-accordion__summary-heading">
                            <button aria-controls="accordion-details-01" aria-expanded="true"
                                    className="slds-button slds-button_reset slds-accordion__summary-action">
                                <svg
                                    className="slds-accordion__summary-action-icon slds-button__icon slds-button__icon_left"
                                    aria-hidden="true">
                                    <use xmlnsxlink="http://www.w3.org/1999/xlink"
                                         xlinkhref="/assets/icons/utility-sprite/svg/symbols.svg#switch"/>
                                </svg>
                                <span className="slds-truncate" title="Accordion summary">Accordion summary</span>
                            </button>
                        </h3>
                        <div className="slds-dropdown-trigger slds-dropdown-trigger_click">
                            <button
                                className="slds-button slds-button_icon slds-button_icon-border-filled slds-button_icon-x-small"
                                aria-haspopup="true" title="Show More">
                                <svg className="slds-button__icon" aria-hidden="true">
                                    <use xmlnsxlink="http://www.w3.org/1999/xlink"
                                         xlinkhref="/assets/icons/utility-sprite/svg/symbols.svg#down"/>
                                </svg>
                                <span className="slds-assistive-text">Show More</span>
                            </button>
                            <div className="slds-dropdown slds-dropdown_actions slds-dropdown_right">
                                <ul className="slds-dropdown__list" role="menu">
                                    <li className="slds-dropdown__item" role="presentation">
                                        <a href="javascript:void(0);" role="menuitem" tabIndex="0">
                                            <span className="slds-truncate" title="Action One">Action One</span>
                                        </a>
                                    </li>
                                    <li className="slds-dropdown__item" role="presentation">
                                        <a href="javascript:void(0);" role="menuitem" tabIndex="-1">
                                            <span className="slds-truncate" title="Action Two">Action Two</span>
                                        </a>
                                    </li>
                                    <li className="slds-dropdown__item" role="presentation">
                                        <a href="javascript:void(0);" role="menuitem" tabIndex="-1">
                                            <span className="slds-truncate" title="Action Three">Action Three</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div aria-hidden="false" className="slds-accordion__content" id="accordion-details-01">Accordion
                        details - A
                    </div>
                </section>
            </li>
            <li className="slds-accordion__list-item">
                <section className="slds-accordion__section">
                    <div className="slds-accordion__summary">
                        <h3 className="slds-accordion__summary-heading">
                            <button aria-controls="accordion-details-02" aria-expanded="false"
                                    className="slds-button slds-button_reset slds-accordion__summary-action">
                                <svg
                                    className="slds-accordion__summary-action-icon slds-button__icon slds-button__icon_left"
                                    aria-hidden="true">
                                    <use xmlnsxlink="http://www.w3.org/1999/xlink"
                                         xlinkhref="/assets/icons/utility-sprite/svg/symbols.svg#switch"/>
                                </svg>
                                <span className="slds-truncate" title="Accordion summary">Accordion summary</span>
                            </button>
                        </h3>
                        <div className="slds-dropdown-trigger slds-dropdown-trigger_click">
                            <button
                                className="slds-button slds-button_icon slds-button_icon-border-filled slds-button_icon-x-small"
                                aria-haspopup="true" title="Show More">
                                <svg className="slds-button__icon" aria-hidden="true">
                                    <use xmlnsxlink="http://www.w3.org/1999/xlink"
                                         xlinkhref="/assets/icons/utility-sprite/svg/symbols.svg#down"/>
                                </svg>
                                <span className="slds-assistive-text">Show More</span>
                            </button>
                            <div className="slds-dropdown slds-dropdown_actions slds-dropdown_right">
                                <ul className="slds-dropdown__list" role="menu">
                                    <li className="slds-dropdown__item" role="presentation">
                                        <a href="javascript:void(0);" role="menuitem" tabIndex="0">
                                            <span className="slds-truncate" title="Action One">Action One</span>
                                        </a>
                                    </li>
                                    <li className="slds-dropdown__item" role="presentation">
                                        <a href="javascript:void(0);" role="menuitem" tabIndex="-1">
                                            <span className="slds-truncate" title="Action Two">Action Two</span>
                                        </a>
                                    </li>
                                    <li className="slds-dropdown__item" role="presentation">
                                        <a href="javascript:void(0);" role="menuitem" tabIndex="-1">
                                            <span className="slds-truncate" title="Action Three">Action Three</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div aria-hidden="true" className="slds-accordion__content" id="accordion-details-02">Accordion
                        details - B
                    </div>
                </section>
            </li>
            <li className="slds-accordion__list-item">
                <section className="slds-accordion__section">
                    <div className="slds-accordion__summary">
                        <h3 className="slds-accordion__summary-heading">
                            <button aria-controls="accordion-details-03" aria-expanded="false"
                                    className="slds-button slds-button_reset slds-accordion__summary-action">
                                <svg
                                    className="slds-accordion__summary-action-icon slds-button__icon slds-button__icon_left"
                                    aria-hidden="true">
                                    <use xmlnsxlink="http://www.w3.org/1999/xlink"
                                         xlinkhref="/assets/icons/utility-sprite/svg/symbols.svg#switch"/>
                                </svg>
                                <span className="slds-truncate" title="Accordion summary">Accordion summary</span>
                            </button>
                        </h3>
                        <div className="slds-dropdown-trigger slds-dropdown-trigger_click">
                            <button
                                className="slds-button slds-button_icon slds-button_icon-border-filled slds-button_icon-x-small"
                                aria-haspopup="true" title="Show More">
                                <svg className="slds-button__icon" aria-hidden="true">
                                    <use xmlnsxlink="http://www.w3.org/1999/xlink"
                                         xlinkhref="/assets/icons/utility-sprite/svg/symbols.svg#down"/>
                                </svg>
                                <span className="slds-assistive-text">Show More</span>
                            </button>
                            <div className="slds-dropdown slds-dropdown_actions slds-dropdown_right">
                                <ul className="slds-dropdown__list" role="menu">
                                    <li className="slds-dropdown__item" role="presentation">
                                        <a href="javascript:void(0);" role="menuitem" tabIndex="0">
                                            <span className="slds-truncate" title="Action One">Action One</span>
                                        </a>
                                    </li>
                                    <li className="slds-dropdown__item" role="presentation">
                                        <a href="javascript:void(0);" role="menuitem" tabIndex="-1">
                                            <span className="slds-truncate" title="Action Two">Action Two</span>
                                        </a>
                                    </li>
                                    <li className="slds-dropdown__item" role="presentation">
                                        <a href="javascript:void(0);" role="menuitem" tabIndex="-1">
                                            <span className="slds-truncate" title="Action Three">Action Three</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div aria-hidden="true" className="slds-accordion__content" id="accordion-details-03">Accordion
                        details - C
                    </div>
                </section>
            </li>
                </ul>
            </div> );
    }
}