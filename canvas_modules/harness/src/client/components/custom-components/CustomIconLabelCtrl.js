/*******************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2021, 2024. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 *******************************************************************************/

import React from "react";
import PropTypes from "prop-types";
// import SVG from "react-inlinesvg";

class CustomIconLabelCtrl extends React.Component {
	constructor(props) {
		super(props);

		this.controlValue = props.controller.getPropertyValue(props.propertyId);
		this.nodesData = props.controller.getAppData();
	}

	render() {
		// const node = this.nodesData.find((nodeData) => nodeData.id === this.controlValue);
		// const image = node.image;
		// const label = node.label;
		return (
			<div className="job-editor-node-table-cell" key={`${this.controlValue}-${this.controlValue}`}>
				{/* <SVG src={`${this.controlValue}`} className="job-editor-nodes-table-cell-icon" draggable="false" /> */}
				<div className="job-editor-node-table-cell-text">{this.controlValue}</div>
			</div>
		);
	}
}

CustomIconLabelCtrl.propTypes = {
	controller: PropTypes.object.isRequired,
	propertyId: PropTypes.object.isRequired,
	table: PropTypes.bool,
	controlValue: PropTypes.string // pass in by redux
};

export default CustomIconLabelCtrl;
