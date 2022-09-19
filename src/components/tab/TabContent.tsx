import React, { Fragment } from "react";
import { TabsState } from "@storybook/components";
import { TabContentProps } from "src/models/tab-addon";
import { LayoutTable } from "./LayoutTable";
export const TabContent: React.FC<TabContentProps> = ({data, headers, meta, code, subComponent }) => (
	<Fragment>
		{(subComponent.length > 0) ? 
				<TabsState initial="component" absolute={true}>
					<div id="component" title={meta.component}>
						<LayoutTable data={data} headers={headers} meta={meta} code={code}></LayoutTable>
					</div>
					{subComponent.map((item, idx) => (
						<div id={'subComponent' + idx} title={item.meta.name} key={idx}>
							{item && item.data && item.headers ?
								<LayoutTable data={item.data} headers={item.headers} meta={item.meta} subComponent={true}></LayoutTable>
							: null}
						</div>
					))}
				</TabsState>
			: <LayoutTable data={data} headers={headers} meta={meta} code={code}></LayoutTable>
		}
	</Fragment>
);
