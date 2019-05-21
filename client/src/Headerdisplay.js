import React, { Component }                                       from "react";
import "./App.css";
import "./lightning-design/styles/salesforce-lightning-design-system.css";
import iconlink                                                   from "./lightning-design/icons/standard/account.svg"
import { AppLauncher, AppLauncherSection, AppLauncherTile, Icon } from '@salesforce/design-system-react';

export default class Headerdisplay extends Component {
  constructor(props) {
    super(props);
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

                  <img className="slds-icon slds-icon_small" src={iconlink}/>
                  <AppLauncher>
    <AppLauncherSection title="Tile Section">
								<AppLauncherTile
                                    title="Marketing Cloud"
                                    iconText="MC"
                                    description="Send emails, track emails, read emails! Emails!"
                                />
								<AppLauncherTile
                                    title="Call Center"
                                    description="The key to call center and contact center is not to use too many words!"
                                    descriptionHeading="Call Center"
                                    iconText="CC"
                                />
							</AppLauncherSection>
							<AppLauncherSection title="Small Tile Section">
								<AppLauncherTile
                                    title="Journey Builder"
                                    iconText="JB"
                                    size="small"
                                />
								<AppLauncherTile
                                    title="Sales Cloud"
                                    iconNode={
                                        <Icon name="campaign" category="standard" size="large"/>
                                    }
                                    size="small"
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
                  <span>First Heroku App</span>
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
