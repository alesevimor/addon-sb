import React from "react";
import { useStorybookApi } from "@storybook/api";
import { TabContent } from "../components/TabContent";
import { StencilJsonDocs } from "../models/stencil-doc-model";
import { getStencilDocJson } from "../index";
import { getCode, getDataFormat, getHeaders, getMetaData, mapEventsData, mapMethodsData, mapPropertiesData } from "../shared/helpers";
import { TabProps } from "../models/tab-addon-model";

export const extractPropsFromElements = (
	tagName: string,
	StencilJsonDocs: StencilJsonDocs,
	options: any
): any => {
	const metaData = getMetaData(tagName, StencilJsonDocs);
	const dataFormat = metaData && getDataFormat(
		mapPropertiesData(metaData.props, options),
		mapMethodsData(metaData.methods),
		mapEventsData(metaData.events),
		options
	)
	return (
		metaData && dataFormat
	);
};

export const Tab: React.FC<TabProps> = ({ active }) => {
	let data, headers, code;
	const state = useStorybookApi();
	const currentStoryData = state.getCurrentStoryData();
	const parameters: any = state.getCurrentParameter();

	// Options
	const options = {dashCase: false};

	if (parameters && currentStoryData) {
		data = extractPropsFromElements(parameters.component, getStencilDocJson(), options);
		headers = getHeaders(data) || null;
		code = parameters.storySource && getCode(parameters.storySource.source.split('`')[1], parameters.component);
	}

	return (active && data && headers && parameters && currentStoryData) ? (
		<TabContent data={data} headers={headers} meta={currentStoryData} code={code} />
	) : null;
};
