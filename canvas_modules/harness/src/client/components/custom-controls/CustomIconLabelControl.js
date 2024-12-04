/*******************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2021. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 *******************************************************************************/

import React from "react";
import CustomIconLabelCtrl from "../custom-components/CustomIconLabelCtrl";

class CustomIconLabelControl {
	static id() {
		return "job-editor-custom-icon-label-control";
	}
	constructor(propertyId, controller, data, tableInfo) {
		this.propertyId = propertyId;
		this.controller = controller;
		this.data = data;
		this.tableInfo = tableInfo;
	}

	renderControl() {
		let key = this.propertyId.name;
		if (this.propertyId.row) {
			key += "_" + this.propertyId.row;
			if (this.propertyId.col) {
				key += "_" + this.propertyId.col;
			}
		}

		return (
			<CustomIconLabelCtrl
				key={"toggle-" + key}
				propertyId={this.propertyId}
				controller={this.controller}
				table={this.tableInfo ? this.tableInfo.table : false}
			/>
		);
	}
}

export default CustomIconLabelControl;
