import React                                                from "react";
import "./App.css";
import "./lightning-design/styles/salesforce-lightning-design-system.css";
import { AppLauncher, AppLauncherSection, AppLauncherTile } from '@salesforce/design-system-react';

var Reflux = require("reflux");
export default class Headerdisplay extends Reflux.Component {
  constructor(props) {
    super(props);
      this.store = ContentReviewStore;
      this.state.currentApp = 'Upsert';
  }
  componentDidMount() {}
  render() {
    return (
      <article className="slds-card">
        <div className="slds-card__header slds-grid">
          <header className="slds-media slds-media_center slds-has-flexi-truncate">
            <div className="slds-media__figure">
              <span
                className="slds-icon_container slds-icon-standard-account"
                title="account"
              >
                  <AppLauncher>
    <AppLauncherSection title="App Selection">
								<AppLauncherTile
                                    title="Upsert Records"
                                    iconText="UR"
                                    description="Upsert Objects serially or parallel and use external Ids to relate them"
                                />
								<AppLauncherTile
                                    title="Sample Data Creator"
                                    description="This tool lets you create sample data for an Object and its related objects"
                                    iconText="SR"
                                />
							</AppLauncherSection>


</AppLauncher>

                <span className="slds-assistive-text">First Heroku App</span>
              </span>
            </div>
            <div className="slds-media__body">
              <h2 className="slds-card__header-title">
                <a
                  href="javascript:void(0);"
                  className="slds-card__header-link slds-truncate"
                  title="First Heroku App"
                >
                    <span>First Heroku App: </span>
                    <span>{this.state.currentApp}_</span>
                </a>
              </h2>
            </div>
          </header>
          <br />
        </div>
      </article>
    );
  }
}
