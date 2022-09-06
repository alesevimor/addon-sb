import React from "react";
import { Group, Story, useStorybookApi } from "@storybook/api";
import { TabContent } from "../components/tab/TabContent";
import { StencilJsonDocs } from "../models/stencil-doc";
import { getStencilDocJson } from "../index";
import { getCode, getDataFormat, getHeaders, getMetaData, mapEventsData, mapMethodsData, mapPropertiesData } from "../shared/helpers";
import { Data, Options, TabComponentProps } from "src/models/tab-addon";
import { Code, Meta } from "src/models/generic";
import { HeadersTableProps } from "src/models/table";
import { NoDataComponent } from "../components/error/no-data";

/**
 * Returns an object with an array for each table: events, methods and properties.
 * @param tagName - Name of the tag that has to validate the getMetaData.
 * @param StencilJsonDocs - Json doc by stencil.
 * @param options - Addon Options.
 */
export const extractPropsFromElements = (
	tagName: string,
	StencilJsonDocs: StencilJsonDocs,
	options: Options
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

/**
 * Render the tab component of the addon.
 * @param active - Render if active is true.
 */
export const Tab: React.FC<TabComponentProps> = ({ active }) => {
	let data: Data, headers: HeadersTableProps, code: Code, meta: Meta, subComponentData: any;
	const state = useStorybookApi();
	const currentStoryData: Story | Group = state.getCurrentStoryData();
	const parameters: any = state.getCurrentParameter();

	// Options
	const options: Options = {dashCase: false};

	if (parameters && parameters.stencilDoc && currentStoryData) {
		meta = {
			name: currentStoryData.name || null,
			component: parameters.stencilDoc.component || null,
			subComponent: parameters.stencilDoc.subComponent || null,
			componentInfo: parameters.stencilDoc.componentInfo || null,
			source: parameters.storySource && parameters.storySource.source || null,
			args: parameters.args || null
		};

		data = extractPropsFromElements(meta.component, getStencilDocJson(), options);
		headers = data && getHeaders(data);
		code = meta.source && getCode(meta.source.split('`')[1], meta.args);

		if (meta.subComponent) {
			const dataChild = extractPropsFromElements(meta.subComponent, getStencilDocJson(), options);
			subComponentData = {
				data: dataChild,
				headers: getHeaders(dataChild),
				meta: {
					name: meta.subComponent || null,
					component: meta.subComponent || null
				}
			};
		}
	}

	return (active && data && headers && parameters && currentStoryData) ? (
		<TabContent data={data} headers={headers} meta={meta} code={code} subComponent={subComponentData}/>
	) : active ? <NoDataComponent /> : null;
};
