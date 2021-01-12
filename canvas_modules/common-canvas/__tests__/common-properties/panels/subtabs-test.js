/*
 * Copyright 2017-2020 Elyra Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import propertyUtils from "./../../_utils_/property-utils";
import tabParamDef from "./../../test_resources/paramDefs/tab_paramDef.json";

import { expect } from "chai";

describe("subtabs renders correctly", () => {
	var wrapper;
	beforeEach(() => {
		const renderedObject = propertyUtils.flyoutEditorForm(tabParamDef);
		wrapper = renderedObject.wrapper;
	});

	afterEach(() => {
		wrapper.unmount();
	});

	it("should have displayed the 3 tabs created", () => {
		const tabContainer = wrapper.find("div[data-id='properties-Primary'] div.properties-sub-tab-container");
		// should render 1 control panel
		expect(tabContainer.find("li.properties-subtab")).to.have.length(3);
	});
});

describe("subtabs visible and enabled conditions work correctly", () => {
	let wrapper;
	let controller;
	beforeEach(() => {
		const renderedObject = propertyUtils.flyoutEditorForm(tabParamDef);
		wrapper = renderedObject.wrapper;
		controller = renderedObject.controller;
	});

	afterEach(() => {
		wrapper.unmount();
	});

	it("subtabs and controls should be disabled", () => {
		let subTab = wrapper.find("li[data-id='properties-fruit-subtab']");
		// check initial state of enabled
		expect(subTab.prop("aria-disabled")).to.equal(false);
		controller.updatePropertyValue({ name: "disable" }, true);
		wrapper.update();
		subTab = wrapper.find("li[data-id='properties-fruit-subtab']");
		expect(subTab.prop("aria-disabled")).to.equal(true);
	});

	it("subtabs and controls should be hidden", () => {
		let subTab = wrapper.find("li[data-id='properties-table-subtab']");
		expect(subTab).to.have.length(1);
		controller.updatePropertyValue({ name: "hide" }, true);
		wrapper.update();
		subTab = wrapper.find("li[data-id='properties-table-subtab']");
		expect(subTab).to.have.length(0);
	});
});

describe("subtabs classNames applied correctly", () => {
	let wrapper;
	beforeEach(() => {
		const renderedObject = propertyUtils.flyoutEditorForm(tabParamDef);
		wrapper = renderedObject.wrapper;
	});

	afterEach(() => {
		wrapper.unmount();
	});

	it("subtabs should have custom classname defined", () => {
		const subTabs = wrapper.find("div.properties-sub-tab-container").at(0);
		const subTabsList = subTabs.find("ul").find("li");
		expect(subTabsList.find(".range-fields-subtab-control-class")).to.have.length(1);
		expect(subTabsList.find(".table-subtab-control-class")).to.have.length(1);
		expect(subTabsList.find(".fruit-subtab-control-class")).to.have.length(1);
		const subTabPanels = subTabs.find("div[role='tabpanel']");
		expect(subTabPanels.find(".range-fields-subtab-control-class")).to.have.length(1);
		expect(subTabPanels.find(".table-subtab-control-class")).to.have.length(1);
		expect(subTabPanels.find(".fruit-subtab-control-class")).to.have.length(1);
	});

	it("should be able to select dom object from custom classname", () => {
		expect(wrapper.find("li.properties-subtab.range-fields-subtab-control-class")).to.have.length(1);
	});
});
