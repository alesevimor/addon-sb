import { Code, Events, Meta, Methods, Properties } from "./generic";
import { HeadersTableProps } from "./table";
import { SourceBlock, LocationsMap } from '@storybook/source-loader';

export interface Data {
	properties: Properties[];
	methods: Methods[];
	events: Events[];
	options: Options;
};

export interface Options {
	dashCase: boolean;
};

export interface SourceParams {
	source: string;
	locationsMap?: LocationsMap;
}

export interface TabContentProps {
	data: Data;
	headers: HeadersTableProps;
	meta: Meta;
	code: Code;
	subComponent?: subComponentProps[];
};

export interface subComponentProps {
	meta: Meta;
	data: Data;
	headers: HeadersTableProps;
};

export interface TabComponentProps {
	active: boolean;
};

export interface LayoutTableProps {
	data: Data;
	headers: HeadersTableProps;
	meta: Meta;
	code?: Code;
	subComponent?: boolean;
};
