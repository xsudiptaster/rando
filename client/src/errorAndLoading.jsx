import CircularProgress from "@material-ui/core/CircularProgress";
import Modal from "@material-ui/core/Modal";
import React from "react";
import "./App.css";
import "./lightning-design/styles/salesforce-lightning-design-system.css";

var Reflux = require("reflux");
var ContentReviewStore = require("./ContentReviewStore.jsx");
var ContentReviewerActions = require("./ContentReviewerActions.jsx");

export default class errorAndLoading extends Reflux.Component {
	constructor(props) {
		super();
		this.store = ContentReviewStore;
	}
	handleClose() {
		this.state.errorModal = { height: "14rem", display: "none" };
		ContentReviewerActions.stateupdates(this.state);
	}
	render() {
		return (
			<div>
				<div>
					<div className="slds-col slds-size_12-of-12">
						<div className="demo-only" style={this.state.errorModal}>
							<section
								role="alertdialog"
								tabIndex={-1}
								aria-labelledby="prompt-heading-id"
								aria-describedby="prompt-message-wrapper"
								className="slds-modal slds-fade-in-open slds-modal_prompt"
								aria-modal="true">
								<div className="slds-modal__container">
									<header className="slds-modal__header slds-theme_error slds-theme_alert-texture">
										<button
											className="slds-button slds-button_icon slds-modal__close slds-button_icon-inverse"
											title="Close">
											<svg
												className="slds-button__icon slds-button__icon_large"
												aria-hidden="true">
												<use
													xmlnsXlink="http://www.w3.org/1999/xlink"
													xlinkHref="./lightning-design/icons/utility-sprite/svg/symbols.svg#close"
												/>
											</svg>
											<span className="slds-assistive-text">Close</span>
										</button>
										<h2 className="slds-text-heading_medium" id="prompt-heading-id">
											ERROR
										</h2>
									</header>
									<div
										className="slds-modal__content slds-p-around_medium"
										id="prompt-message-wrapper">
										<p>{this.state.errorMessage}</p>
									</div>
									<footer className="slds-modal__footer slds-theme_default">
										<button
											className="slds-button slds-button_neutral"
											onClick={() => this.handleClose()}>
											Close
										</button>
									</footer>
								</div>
							</section>
							<div className="slds-backdrop slds-backdrop_open" />
						</div>
					</div>
					<Modal open={this.state.showProgress}>
						<div id="modalLoader">
							<div
								style={{
									height: "100%",
									width: "100%",
									zIndex: "10",
									backgroundColor: "rgba(0,0,0,0.3)",
									top: 0,
									left: 0,
								}}>
								<CircularProgress
									style={{
										position: "absolute",
										top: "30%",
										left: "50%",
										width: "51px",
										height: "51px",
										zIndex: "10",
									}}
								/>
							</div>
						</div>
					</Modal>
				</div>
			</div>
		);
	}
}
