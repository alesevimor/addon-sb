import React, { Fragment } from "react";
import { styled } from "@storybook/theming";
import { Source, Link, Table, Subtitle, Title, TabsState } from "@storybook/components";
import { CellItemProps, RowItemProps, TabContentProps } from "src/models/tab-addon-model";

const TabWrapper = styled.div(({ theme }) => ({
  background: theme.background.content,
  padding: "4rem 20px",
  minHeight: "100vh",
  boxSizing: "border-box",
}));

const TabInner = styled.div({
  maxWidth: 1024,
  marginLeft: "auto",
  marginRight: "auto",
});

export const Cell: React.FC<CellItemProps> = ({ text, title }) => {
	return (
	  	<Fragment>
			{title ? <th>{text}</th> : <td>{text}</td>}
	  	</Fragment>
	);
};

export const Row: React.FC<RowItemProps> = ({ item }) => {
	return (
	  	<Fragment>
			<tr>
				{Object.values(item).map((text: any, idx: number) =>
					<Cell key={idx} text={text}></Cell>
				)}
			</tr>
	  	</Fragment>
	);
};

export const TabContent: React.FC<TabContentProps> = ({data, headers, meta, code }) => (
  <TabWrapper>
    <TabInner>
		<Title>{meta.name}</Title>

		<TabsState initial="html">
			{code.html ? 
				<div id="html" title="HTML">
					<Source code={code.html} language="html" format={true} dark/>
				</div>
			: null}
			{code.js ? 
				<div id="js" title="JavaScript">
					<Source code={code.js} language="html" format={true} dark/>
				</div>
			: null}
		</TabsState>

		{(data.properties.length > 0) ? <Subtitle>Properties</Subtitle> : null}
		<Table>
			<thead>
				<tr>
					{headers.properties.map((text: string, idx: number) =>
						<Cell key={idx} text={text} title={true}></Cell>
					)}
				</tr>
			</thead>
			<tbody>
				{data.properties.map((item: any, idx: number) =>
					<Row key={idx} item={item}></Row>
				)}
			</tbody>
		</Table>

		{(data.methods.length > 0) ? <Subtitle>Methods</Subtitle> : null}
		<Table>
			<thead>
				<tr>
					{headers.methods.map((text: string, idx: number) =>
						<Cell key={idx} text={text} title={true}></Cell>
					)}
				</tr>
			</thead>
			<tbody>
				{data.methods.map((item: any, idx: number) =>
					<Row key={idx} item={item}></Row>
				)}
			</tbody>
		</Table>

		{(data.events.length > 0) ? <Subtitle>Events</Subtitle> : null}
		<Table>
			<thead>
				<tr>
					{headers.events.map((text: string, idx: number) =>
						<Cell key={idx} text={text} title={true}></Cell>
					)}
				</tr>
			</thead>
			<tbody>
				{data.events.map((item: any, idx: number) =>
					<Row key={idx} item={item}></Row>
				)}
			</tbody>
		</Table>
    </TabInner>
  </TabWrapper>
);
