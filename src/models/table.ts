export interface HeadersTableProps {
	properties: string[];
	methods: string[];
	events: string[];
};

export interface CellComponentProps {
	text: string | number | boolean;
	title?: boolean;
};

export interface RowComponentProps {
	item: any;
};
export interface TableComponentProps {
	headers: any[];
	data: any[];
};