/* eslint-env browser */
import {
  StencilJsonDocs,
  StencilJsonDocsEvent,
  StencilJsonDocsMethod,
  StencilJsonDocsProp,
} from '../models/stencil-doc';
import { logger } from '@storybook/client-logger';
import { Data, Options } from 'src/models/tab-addon';

/**
 * Returns boolean depending on whether the component is valid.
 * @param tagName - Name of the tag that has to validate the function
 */
export const isValidComponent = (tagName: string) => {
	if (!tagName) {
		return false;
	}
	if (typeof tagName === 'string') {
		return true;
	}
	throw new Error(
		'Provided component needs to be a string. e.g. component: "my-element"'
	);
};

/**
 * Returns boolean depending on whether the metadata is valid.
 * @param stencilDocJson - Json doc by stencil
 */
export const isValidMetaData = (stencilDocJson: StencilJsonDocs) => {
	if (!stencilDocJson) {
		return false;
	}
	if (stencilDocJson.components && Array.isArray(stencilDocJson.components)) {
		return true;
	}
	throw new Error(`You need to setup valid meta data in your preview.js via setStencilDocJson().
		The meta data can be generated with the stencil output target 'docs-json'.`);
};

/**
 * Fetch and return metadata.
 * @param tagName - Name of the tag that has to evaluate the function
 * @param stencilDocJson - Json doc by stencil
 */
export const getMetaData = (
	tagName: string,
	stencilDocJson: StencilJsonDocs
) => {
	if (!isValidComponent(tagName) || !isValidMetaData(stencilDocJson)) {
		return null;
	}

	const metaData = stencilDocJson.components.find(
		(component) => component.tag.toUpperCase() === tagName.toUpperCase()
	);

	if (!metaData) {
		logger.warn(`Component not found in stencil doc json: ${tagName}`);
	}
	return metaData;
};

/**
 * Returns an array with all the properties of the component.
 * @param data - Documentation of the selected component (Properties).
 * @param options - Addon Options.
 */
export const mapPropertiesData = (data: StencilJsonDocsProp[], options: Options) => {
	const { dashCase } = options;
	return (
		data &&
		data.reduce((acc, item) => {
			const key = dashCase === true ? item.attr || item.name : item.name;
			acc[key] = {
				name: item.attr || item.name,
				description: item.docs,
				type: item.type,
				defaultValue: item.default,
			};
			return acc;
		}, {} as any)
	);
};

/**
 * Returns an array with all the Method of the component.
 * @param data - Documentation of the selected component (Methods).
 */
export const mapMethodsData = (data: StencilJsonDocsMethod[]) => {
  	return (
		data &&
		data.reduce((acc, item) => {
			acc[`method-${item.name}`] = {
				name: item.name,
				description: item.docs,
				type: 'void',
				signature: item.signature,
			};
			return acc;
		}, {} as any)
  	);
};

/**
 * Returns an array with all the events of the component.
 * @param data - Documentation of the selected component (Events).
 */
export const mapEventsData = (data: StencilJsonDocsEvent[]) => {
	return (
		data &&
		data.reduce((acc, item) => {
			acc[`event-${item.event}`] = {
				name: item.event,
				description: item.docs,
				detail: item.detail,
				type: 'void',
			};
			return acc;
		}, {} as any)
	);
}

/**
 * Returns an array with options, properties, methods, and grouped events.
 * @param mapPropertiesData - Array with all properties.
 * @param mapMethodsData - Array with all methods.
 * @param mapEventsData - Array with all events.
 * @param Options - Addon options.
 */
export const getDataFormat = (mapPropertiesData: StencilJsonDocsProp[], mapMethodsData: StencilJsonDocsMethod[], mapEventsData:StencilJsonDocsEvent[], options?: Options) => {
	return {
		options: options || null,
		properties: Object.values(mapPropertiesData) || [],
		methods: Object.values(mapMethodsData) || [],
		events: Object.values(mapEventsData) || []
	}
};

/**
 * Returns an array with headers for the table.
 * @param Data - Receive what the getDataFormat method returns.
 */
export const getHeaders = (data: Data) => {
	return data ? {
		properties: (data.properties.length > 0) ? Object.getOwnPropertyNames(data.properties[0]) : [],
		methods: (data.methods.length > 0) ? Object.getOwnPropertyNames(data.methods[0]) : [],
		events: (data.events.length > 0) ? Object.getOwnPropertyNames(data.events[0]) : []
	} : null;
};

/**
 * Returns an array with headers for the table.
 * @param code - Returns an object with the html and the javascript code to print it in the source tab.
 */
export const getCode = (code: string, args: any) => {
	let html, js = '';

	if (code) {
		let div = document.createElement('div');
		div.innerHTML = code;
		html = div.querySelector('#code-html') && div.querySelector('#code-html').innerHTML || '';
		js = div.querySelector('script') && div.querySelector('script').outerHTML || '';

		if (args) {
			for (const property in args) {
				html = html.replace('${args.' + property + '}', args[property]);
			}
		}
	}
	
	return {
		html: html,
		js: js
	}
};
