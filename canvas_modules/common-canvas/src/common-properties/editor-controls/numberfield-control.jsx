/*******************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2016. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 *******************************************************************************/

import React from "react";
import PropTypes from "prop-types";
import { TextField } from "ap-components-react/dist/ap-components-react";
import EditorControl from "./editor-control.jsx";
import { EDITOR_CONTROL } from "../constants/constants.js";

export default class NumberfieldControl extends EditorControl {
	constructor(props) {
		super(props);
		this.state = {
			controlValue: props.valueAccessor(props.control.name),
			userInputValue: props.valueAccessor(props.control.name)

		};
		this.getControlValue = this.getControlValue.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.clearValue = this.clearValue.bind(this);
	}

	handleChange(evt) {
		const number = parseFloat(evt.target.value);
		this.setState({ controlValue: evt.target.value,
			userInputValue: evt.target.value });
		if (!isNaN(number)) {
			this.setState({ controlValue: number });
			this.props.updateControlValue(this.props.control.name, number);
		} else if (evt.target.value === "") {
			this.setState({ controlValue: null });
			this.props.updateControlValue(this.props.control.name, null);
		}
	}

	getControlValue() {
		return this.state.controlValue;
	}

	clearValue() {
		const that = this;
		this.setState({ controlValue: null },
			function() {
				that.validateInput();
			});
	}

	render() {
		const controlName = this.getControlID().replace(EDITOR_CONTROL, "");
		const conditionProps = {
			controlName: controlName,
			controlType: "number"
		};
		const conditionState = this.getConditionMsgState(conditionProps);

		const errorMessage = conditionState.message;
		const messageType = conditionState.messageType;
		const icon = conditionState.icon;
		const stateDisabled = conditionState.disabled;
		const stateStyle = conditionState.style;

		let controlIconContainerClass = "control-icon-container";
		if (messageType !== "info") {
			controlIconContainerClass = "control-icon-container-enabled";
		}

		let numValue = "";
		if (this.state.userInputValue !== null) {
			numValue = this.state.userInputValue;
		}

		return (
			<div className="editor_control_area" style={stateStyle}>
				<div id={controlIconContainerClass}>
					<TextField {...stateDisabled}
						style={stateStyle}
						type="number"
						id={this.getControlID()}
						onBlur={this.validateInput}
						onKeyUp={
							(evt) => {
								this.validateInput();
							}
						}
						placeholder={this.props.control.additionalText}
						disabledPlaceholderAnimation
						onChange={this.handleChange}
						value={numValue}
						onReset={() => this.clearValue()}
					/>
					{icon}
				</div>
				{errorMessage}
			</div>
		);
	}
}

NumberfieldControl.propTypes = {
	control: PropTypes.object,
	controlStates: PropTypes.object,
	validationDefinitions: PropTypes.object,
	requiredParameters: PropTypes.array,
	validateConditions: PropTypes.func,
	updateValidationErrorMessage: PropTypes.func,
	retrieveValidationErrorMessage: PropTypes.func,
	updateControlValue: PropTypes.func
};
