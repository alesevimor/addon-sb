import React, { Fragment } from "react";
import { LayoutTableProps } from "src/models/tab-addon";
import { Title, Subtitle } from "@storybook/components";
import { SourceComponent } from "./source";
import { TableComponent } from "./Table";
import { styled } from "@storybook/theming";

export const TabWrapper = styled.div(({ theme }) => ({
	background: theme.background.content,
	padding: "4rem 20px",
	minHeight: "100vh",
	boxSizing: "border-box",
}));
  
export const TabInner = styled.div({
	maxWidth: 1024,
	marginLeft: "auto",
	marginRight: "auto",
});

export const ContentTitle = styled.div({
	marginBottom: 20,
});

export const LayoutTable: React.FC<LayoutTableProps> = ({data, headers, meta, code, subComponent }) => (
	<TabWrapper>
		<TabInner>
			{(code && !subComponent) ? 
				<Fragment>
					<Title>{meta.name}</Title>
					{meta.componentInfo ? 
						<Fragment>
							<p>{meta.componentInfo}</p>
						</Fragment>
					: null}
					<SourceComponent code={code}></SourceComponent>
				</Fragment>
			: 
				<ContentTitle>
					<Title>{meta.name}</Title>
				</ContentTitle>
			}

			{(data.properties.length > 0) ? 
				<Fragment>
					<Subtitle>Properties</Subtitle>
					<TableComponent headers={headers.properties} data={data.properties}></TableComponent>
				</Fragment>
			: null}

			{(data.methods.length > 0) ? 
				<Fragment>
					<Subtitle>Methods</Subtitle>
					<TableComponent headers={headers.methods} data={data.properties}></TableComponent>
				</Fragment>
			: null}

			{(data.events.length > 0) ? 
				<Fragment>
					<Subtitle>Events</Subtitle>
					<TableComponent headers={headers.events} data={data.events}></TableComponent>
				</Fragment>
			: null}
		</TabInner>
	</TabWrapper>
);