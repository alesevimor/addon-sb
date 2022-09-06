import { Source, TabsState } from "@storybook/components";
import React from "react";
import { SourceComponentProps } from "src/models/generic";

export const SourceComponent: React.FC<SourceComponentProps> = ({ code }) => {
	return (
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
	);
};
