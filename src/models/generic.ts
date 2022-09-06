export interface SourceComponentProps {
	code: Code;
};

export interface Meta {
	name: string;
	component: string;
	subComponent?: string;
	componentInfo?: string;
	source?: string;
	args?: any;
};

export interface Code {
	html: string;
	js: string
}

export interface Properties {
	defaultValue: string;
	description: string;
	name: string;
	type: string;
};

export interface Methods {
	description: string;
	name: string;
	signature: string;
	type: string;
};

export interface Events {
	name: string;
	detail: string;
	type: string;
	description: string;
};