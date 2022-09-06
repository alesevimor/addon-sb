/* eslint-env browser */
import {
  StencilJsonDocs,
  StencilJsonDocsEvent,
  StencilJsonDocsMethod,
  StencilJsonDocsProp,
} from "../models/stencil-doc-model";
import { logger } from "@storybook/client-logger";

export const isValidComponent = (tagName: string) => {
	if (!tagName) {
		return false;
	}
	if (typeof tagName === "string") {
		return true;
	}
	throw new Error(
		'Provided component needs to be a string. e.g. component: "my-element"'
	);
};

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

export const mapPropertiesData = (data: StencilJsonDocsProp[], options: any): any => {
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

export const mapMethodsData = (data: StencilJsonDocsMethod[]): any => {
  	return (
		data &&
		data.reduce((acc, item) => {
			acc[`method-${item.name}`] = {
				name: item.name,
				description: item.docs,
				type: "void",
				signature: item.signature,
			};
			return acc;
		}, {} as any)
  	);
};

export const mapEventsData = (data: StencilJsonDocsEvent[]): any => {
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

export const getDataFormat = (mapPropertiesData: StencilJsonDocsProp[], mapMethodsData: StencilJsonDocsMethod[], mapEventsData:StencilJsonDocsEvent[], options?: any) => {
	return {
		options: options || null,
		properties: Object.values(mapPropertiesData) || [],
		methods: Object.values(mapMethodsData) || [],
		events: Object.values(mapEventsData) || []
	}
};

export const getHeaders = (data: any) => {
	return {
		properties: (data.properties.length > 0) ? Object.getOwnPropertyNames(data.properties[0]) : [],
		methods: (data.methods.length > 0) ? Object.getOwnPropertyNames(data.methods[0]) : [],
		events: (data.events.length > 0) ? Object.getOwnPropertyNames(data.events[0]) : []
	}
};

export const getCode = (code: string, component: string) => {
	let html, js = '';
	if (code) {
		let div = document.createElement('div');
		div.innerHTML = code;
		html = div.querySelector('#code-html') && div.querySelector('#code-html').innerHTML || '';
		js = div.querySelector('script') && div.querySelector('script').outerHTML || '';
	}

	return {
		html: html,
		js: js
	}
};

export const clearStyles = (selector: any) => {
	const selectors = Array.isArray(selector) ? selector : [selector];
	selectors.forEach(clearStyle);
};

const clearStyle = (selector: string) => {
	const element = document.getElementById(selector);
	if (element && element.parentElement) {
		element.parentElement.removeChild(element);
	}
};

export const addOutlineStyles = (selector: string, css: string) => {
  	const existingStyle = document.getElementById(selector);
	if (existingStyle) {
		if (existingStyle.innerHTML !== css) {
		existingStyle.innerHTML = css;
		}
	} else {
		const style = document.createElement("style");
		style.setAttribute("id", selector);
		style.innerHTML = css;
		document.head.appendChild(style);
	}
};
