import React, { Fragment } from "react";
import { TabsState } from "@storybook/components";
import { TabContentProps } from "src/models/tab-addon";
import { LayoutTable } from "./LayoutTable";

export const TabContent: React.FC<TabContentProps> = ({data, headers, meta, code, subComponent }) => (
	<Fragment>
		{(subComponent && subComponent.data && subComponent.headers) ? 
			<TabsState initial="component">
				<div id="component" title={meta.component}>
					<LayoutTable data={data} headers={headers} meta={meta} code={code}></LayoutTable>
				</div>
				<div id="subComponent" title={meta.subComponent}>
					<LayoutTable data={subComponent.data} headers={subComponent.headers} meta={subComponent.meta} subComponent={true}></LayoutTable>
				</div>
			</TabsState> : 
			<LayoutTable data={data} headers={headers} meta={meta} code={code}></LayoutTable>
		}
	</Fragment>
);
