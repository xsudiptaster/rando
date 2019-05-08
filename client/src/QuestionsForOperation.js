import React                 from "react";
import "./App.css";
import "./lightning-design/styles/salesforce-lightning-design-system.css";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon        from '@material-ui/icons/ExpandMore';
import Typography            from "@material-ui/core/Typography";
import ExpansionPanel        from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";

var Reflux = require("reflux");
var ContentReviewStore = require("./ContentReviewStore.jsx");
var ContentReviewerActions = require("./ContentReviewerActions.jsx");

export default class FileuploadSection extends Reflux.Component {
  constructor(props) {
    super(props);
    this.store = ContentReviewStore;
    this.setState({
      isRelated: false
    });
  }

  isRealtedCheck(event) {
    this.state.isRelated = event.target.value;
  }

  sheetsToInsertfn(event) {
    if (event.target.checked) {
      if (
        this.state.sheetsToInsert &&
        this.state.sheetsToInsert.indexOf(event.target.value) == -1
      ) {
        this.state.sheetsToInsert.push(event.target.value);
      } else {
        this.state.sheetsToInsert = [];
        this.state.sheetsToInsert.push(event.target.value);
      }
    } else {
      if (
        this.state.sheetsToInsert &&
        this.state.sheetsToInsert.indexOf(event.target.value) != -1
      ) {
        this.state.sheetsToInsert.splice(
          this.state.sheetsToInsert.indexOf(event.target.value),
          1
        );
      }
    }
      ContentReviewerActions.stateupdates(this.state);
  }

  gotoObjectMapping() {
    if (this.state.sheetsToInsert != undefined) {
      this.state.objectMapping = {};
      for (var i = 0; i < this.state.sheetsToInsert.length; i++) {
        this.state.objectMapping[this.state.sheetsToInsert[i]] = {};
        this.state.objectMapping[this.state.sheetsToInsert[i]].ObjectName = "";
        this.state.objectMapping[this.state.sheetsToInsert[i]].ExtFromSheet =
          "";
        this.state.objectMapping[this.state.sheetsToInsert[i]].ExtFromObject =
          "";
        this.state.objectMapping[
          this.state.sheetsToInsert[i]
        ].sheetHeaders = [];
        this.state.objectMapping[
          this.state.sheetsToInsert[i]
        ].sheetObjectFields = [];
      }
    } else {
      alert("Select a Sheet at least");
      return;
    }
    this.state.questionfordisplay = { display: "none" };
    this.state.objectmappingdisplay = { display: "block" };
    ContentReviewerActions.stateupdates(this.state);
  }

  render() {
    var rowsdv = [];
      var shhetstoInsert = [];
    if (this.state && this.state.sheetNames != undefined) {
        rowsdv=this.state.sheetNames;
    }
      if (this.state && this.state.sheetsToInsert != undefined) {
          console.log('Selected Sheets', this.state.sheetsToInsert);
          shhetstoInsert = this.state.sheetsToInsert;
      }
    return (
      <div>
          <input
              type="button"
              value="Proceed to Object Mapping"
              className="slds-button slds-button_neutral"
              onClick={() => this.gotoObjectMapping()}
          />
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
            <Typography>Questions</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              <article className="slds-card">
                <div className="slds-card__header slds-grid">
                  <table>
                    <tr>
                      <td>
                        <div className="slds-media__body">
                          <h2 className="slds-card__header-title">
                            <a
                                href="javascript:void(0);"
                                className="slds-card__header-link slds-truncate"
                                title="Accounts"
                            >
                              <span>Are the Sheets Related ?</span>
                            </a>
                          </h2>
                        </div>
                      </td>
                      <td>
                        <div>
                          <input
                              type="checkbox"
                              className="slds-checkbox"
                              onChange={this.isRealtedCheck.bind(this)}
                          />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="slds-media__body">
                          <h2 className="slds-card__header-title">
                            <a
                                href="javascript:void(0);"
                                className="slds-card__header-link slds-truncate"
                                title="Accounts"
                            >
                              <span>Sheets to Insert ?</span>
                            </a>
                          </h2>
                        </div>
                      </td>
                    </tr>

                    {rowsdv.map(value => (
                        <tr>
                          <td>
                            <label className="slds-text-body_small">{value}</label>
                          </td>
                          <td>
                            <input
                                type="checkbox"
                                value={value}
                                onChange={this.sheetsToInsertfn.bind(this)}
                            />
                          </td>
                        </tr>
                    ))}
                  </table>
                </div>

              </article>

            </Typography>

          </ExpansionPanelDetails>
        </ExpansionPanel>
          <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                  <Typography>Sequence the Upsert</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                  <table>
                      <tr>
                          <td>
                              <Typography>
                                  <div className="slds-media__body">
                                      <h2 className="slds-card__header-title">
                                          <a
                                              href="javascript:void(0);"
                                              className="slds-card__header-link slds-truncate"
                                              title="Accounts"
                                          >
                                              <span>Insert Sheets Parallel ?</span>
                                          </a>
                                      </h2>
                                  </div>
                                  <div>
                                      <input
                                          type="checkbox"
                                          className="slds-checkbox"
                                          onChange={this.isRealtedCheck.bind(this)}
                                      />
                                  </div>
                              </Typography>

                          </td>
                      </tr>
                      <tr>
                          <td>
                              <Typography>
                                  <ul>
                                      {shhetstoInsert.map(value => (
                                          <li>
                                              <article className="slds-card">
                                                  <div className="slds-card__header slds-grid">
                                                      <div>
                                                          <svg className="slds-icon" aria-hidden="true">
                                                              <use
                                                                  xlinkHref=""/>
                                                          </svg>
                                                          <img
                                                              src="/client/src/lightning-design/icons/utility-sprite/svg/symbols.svg#announcement"/>
                                                      </div>
                                                      {value}
                                                      <div>
                                                          <svg className="slds-icon" aria-hidden="true">
                                                              <use
                                                                  xlinkHref="/client/src/lightning-design/icons/utility-sprite/svg/symbols.svg#announcement"/>
                                                          </svg>
                                                      </div>
                                                  </div>
                                              </article>

                                          </li>
                                      ))}

                                  </ul>
                              </Typography>
                          </td>
                      </tr>
                  </table>


              </ExpansionPanelDetails>
          </ExpansionPanel>
        <div>
        </div>
      </div>
    );
  }
}
