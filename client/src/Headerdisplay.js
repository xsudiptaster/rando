import React, { Component } from "react"
import "./App.css"
import axios from "axios"
import "./lightning-design/styles/salesforce-lightning-design-system.css";

export default class Headerdisplay extends Component {
    
    constructor(props) {
        super(props);
    }
    componentDidMount() {
    }
    render(){
        return(
            <article className="slds-card">
  <div className="slds-card__header slds-grid">
    <header className="slds-media slds-media_center slds-has-flexi-truncate">
      <div className="slds-media__figure">
        <span className="slds-icon_container slds-icon-standard-account" title="account">
          <svg className="slds-icon slds-icon_small" aria-hidden="true">
            <use xlinkHref="/assets/icons/standard-sprite/svg/symbols.svg#account" />
          </svg>
          <span className="slds-assistive-text">First Heroku App</span>
        </span>
      </div>
      <div className="slds-media__body">
        <h2 className="slds-card__header-title">
          <a href="javascript:void(0);" className="slds-card__header-link slds-truncate" title="Accounts">
            <span>Accounts</span>
          </a>
        </h2>
      </div>
    </header>
    <br /><br />
      <br /><br />
      <br /><br />
  </div>
</article>

        )
    }    
}
