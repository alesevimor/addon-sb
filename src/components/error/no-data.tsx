import React, { Fragment } from "react";
import { Source } from "@storybook/components";
import { TabInner, TabWrapper } from "../tab/LayoutTable";

const exampleParameters = `
	parameters: {
		stencilDoc: {
			component: "pelayo-accordion",
			subComponent: "pelayo-accordion-item",
			componentInfo: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
		}
	}
`;

/**
 * Render the nodata component if no meta data has been added.
 */
export const NoDataComponent: React.FC = () => (
	<TabWrapper>
		<TabInner>
			<Fragment>
				<p> <strong>Nada que mostrar</strong>, parece que no configuraste correctamente los parámetros en la historia de este componente.</p>
				<p>Ejemplo:</p>
				<Source code={exampleParameters} language="json" format={true} dark />
				<p>*Los parámetros subComponent y componentInfo son opcionales.</p>
			</Fragment>
		</TabInner>
  	</TabWrapper>
);
