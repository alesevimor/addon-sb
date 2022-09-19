import { Table } from "@storybook/components";
import React, { Fragment } from "react";
import { CellComponentProps, RowComponentProps, TableComponentProps } from "src/models/table";

const Cell: React.FC<CellComponentProps> = ({ text, title }) => {
	return (
	  	<Fragment>
			{title ? <th>{text}</th> : <td>{text}</td>}
	  	</Fragment>
	);
};

const Row: React.FC<RowComponentProps> = ({ item }) => {
	return (
	  	<Fragment>
			<tr>
				{Object.values(item).map((text: string, idx: number) =>
					<Cell key={idx} text={text}></Cell>
				)}
			</tr>
	  	</Fragment>
	);
};

const tableStyle = {
	width: "100%"
};

export const TableComponent: React.FC<TableComponentProps> = ({ headers, data }) => {
	return (
		<Table style={tableStyle}>
			<thead>
				<tr>
					{headers.map((text: string, idx: number) =>
						<Cell key={idx} text={text} title={true}></Cell>
					)}
				</tr>
			</thead>
			<tbody>
				{data.map((item: string, idx: number) =>
					<Row key={idx} item={item}></Row>
				)}
			</tbody>
		</Table>
	);
};