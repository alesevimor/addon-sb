import React from "react";
import { useParameter, useStorybookApi } from "@storybook/api";
import { TabContent } from "../components/tab/TabContent";
import { StencilJsonDocs } from "../models/stencil-doc";
import { getStencilDocJson } from "../index";
import { getCode, getDataFormat, getHeaders, getInfo, getMetaData, mapEventsData, mapMethodsData, mapPropertiesData, removeInfoTemplate } from "../shared/helpers";
import { Data, Options, SourceParams, subComponentProps, TabComponentProps } from "src/models/tab-addon";
import { Code, Meta } from "src/models/generic";
import { HeadersTableProps } from "src/models/table";
import { NoDataComponent } from "../components/error/no-data";
import { getSource } from "../shared/extract-source";

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
	let data: Data, headers: HeadersTableProps, code: Code, meta: Meta, subComponentData: subComponentProps[] = [];
	const state = useStorybookApi();
	const currentStoryData: any = state.getCurrentStoryData();
	const parameters: any = state.getCurrentParameter();
	const { source, locationsMap }: SourceParams = useParameter('storySource', {
		source: 'loading source...',
	});
	const currentSource = getSource(currentStoryData);
	
	// Options
	const options: Options = {dashCase: false};

	if (parameters && parameters.stencilDoc && currentStoryData) {
		meta = {
			name: currentStoryData.name || null,
			component: parameters.stencilDoc.component || null,
			subComponent: parameters.stencilDoc.subComponent || null,
			componentInfo: '',
			source: null,
			args: parameters.args || null
		};
		data = extractPropsFromElements(meta.component, getStencilDocJson(), options);
		headers = data && getHeaders(data);
		meta.componentInfo = getInfo(currentSource);
		meta.source = meta.componentInfo ? removeInfoTemplate(currentSource) : currentSource;

		code = meta.source && getCode(meta.source.split('`')[1], meta.args);

		if (meta.subComponent && Array.isArray(meta.subComponent)) {
			meta.subComponent.forEach(element => {
				let dataChild = extractPropsFromElements(element, getStencilDocJson(), options);
				subComponentData.push({
					data: dataChild,
					headers: getHeaders(dataChild),
					meta: {
						name: element || null,
						component: element || null
					}
				});
			});
		}
	}

	return (active && data && headers && parameters && currentStoryData) ? (
		<TabContent data={data} headers={headers} meta={meta} code={code} subComponent={subComponentData}/>
	) : active ? <NoDataComponent /> : null;
};
