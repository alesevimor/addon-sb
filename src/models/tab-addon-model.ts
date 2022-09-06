import { API } from "@storybook/api";

export interface TabContentProps {
	data: any;
	headers: any;
	meta: any;
	code?: { html: string; js: string };
}

type Item = {
	title: string;
	description: string;
};

export interface CellItemProps {
	text: string | number | boolean;
	title?: boolean;
}

export interface RowItemProps {
	item: any;
}

export interface TabProps {
	active: boolean;
	api: API;
}
