import React from "react";
import "./App.css";
import "./lightning-design/styles/salesforce-lightning-design-system.css";
import {AppLauncher, AppLauncherSection, AppLauncherTile} from "@salesforce/design-system-react";

var Reflux = require("reflux");
var ContentReviewerActions = require("./ContentReviewerActions.jsx");
var ContentReviewStore = require("./ContentReviewStore.jsx");
export default class Headerdisplay extends Reflux.Component {
    constructor(props) {
        super(props);
        this.store = ContentReviewStore;
    }

    componentDidMount() {
    }

    render() {
        var CurrentApp = this.state != undefined ? this.state.currentApp : "";
        return (
            <article className="slds-card">
                <div className="slds-card__header slds-grid">
                    <header className="slds-media slds-media_center slds-has-flexi-truncate">
                        <div className="slds-media__figure">
							<span title="account">
								<AppLauncher>
									<AppLauncherSection title="App Selection">
										<AppLauncherTile
                                            title="Upsert Records"
                                            iconText="UR"
                                            description="Upsert Objects serially or parallel and use external Ids to relate them"
                                            href="/upsert"
                                        />
										<AppLauncherTile
                                            title="Sample Data Creator"
                                            description="This tool lets you create sample data for an Object and its related objects"
                                            iconText="SR"
                                        />
										<AppLauncherTile
                                            title="PostgreSQL Editor"
                                            description="This tool lets you maintain a postGreSQL table"
                                            iconText="PE"
                                        />
									</AppLauncherSection>
								</AppLauncher>
							</span>
                        </div>
                        <div className="slds-media__body">
                            <h2 className="slds-card__header-title">
                                <a
                                    href="javascript:void(0);"
                                    className="slds-card__header-link slds-truncate"
                                    title="First Heroku App">
                                    <span>First Heroku App</span>
                                </a>

                            </h2>
                        </div>
                        <label className="slds-text-align_center" style={{align: "center"}}>{CurrentApp} </label>
                    </header>
                    <br/>
                </div>
            </article>
        );
    }
}
