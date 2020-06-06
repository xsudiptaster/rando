import "../Css/modal.css";

import CircularProgress from "@material-ui/core/CircularProgress";
import Dialog from "@material-ui/core/Dialog";
import Modal from "@material-ui/core/Modal";
import React from "react";
import { Typography } from "@material-ui/core";
import { connect } from "react-redux";

export class Spinner extends React.Component {
  render() {
    return (
      <div>
        <div
          id="mymodal"
          className="slds-modal__container slds-align_absolute-center"
        >
          <div>
            <CircularProgress disableShrink />
          </div>
        </div>
        <div className="slds-backdrop slds-backdrop_open"></div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  data: state,
});
const mapDispatchToProps = {};
const SpinnerContainer = connect(mapStateToProps, mapDispatchToProps)(Spinner);
export default SpinnerContainer;
