export default {
	title: "components/Panel/Accordion item",
	parameters: {
		stencilDoc: {
			component: "pelayo-accordion",
			subComponent: "pelayo-tab",
			componentInfo: "Opcionalmente puedes escribir una descripción del componente en la historia."
		}
	},
	argTypes: {
		indicatorLocation: {
			options: ["left", "right"],
			control: { type: "radio" },
		}
	},
};

const basicTPL = (args) => {
  	return `
		<div id="code-html">
			<pelayo-accordion-item heading="${args.heading}" is-disabled="${args.isDisabled}" panel-class="${args.panelClass}" indicator-location="${args.indicatorLocation}">
				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
			</pelayo-accordion-item>
		</div>	
	`;
};

export const basic = basicTPL.bind({});
basic.args = {
	heading: "Header I",
	isDisabled: false,
	panelClass: "testClass",
	indicatorLocation: "left",
};

basic.storyName = "Basic";

const withHeaderTPL = (args) => {
  	return `
		<div id="code-html">
			<pelayo-accordion-item is-disabled="${args.isDisabled}" is-open="${args.isOpen}" panel-class="${args.panelClass}" indicator-location="right">
				<span class="accordion-toggle-heading m-l-4" slot="accordion-heading">Heading custom mediante slot</span>
				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
			</pelayo-accordion-item>
		</div>
  	`;
};

export const withHeader = withHeaderTPL.bind({});
withHeader.args = {
	isOpen: true,
	isDisabled: false,
	panelClass: "testClass",
};

withHeader.storyName = "Header template";

const withButtonsTPL = (args) => {
  	return `
		<div id="code-html">
			<pelayo-accordion-item heading="${args.heading}" is-disabled="${args.isDisabled}" panel-class="${args.panelClass}" indicator-location="${args.indicatorLocation}">
				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
			</pelayo-accordion-item>
			<pelayo-button cssclass="btn-primary" value="Abrir" onclick="document.querySelector('pelayo-accordion-item').open();"></pelayo-button>
			<pelayo-button cssclass="btn-primary" value="Cerrar" onclick="document.querySelector('pelayo-accordion-item').close();"></pelayo-button>
		</div>
    `;
};

export const withButton = withButtonsTPL.bind({});
withButton.args = {
	heading: "Header I",
	isDisabled: false,
	panelClass: "testClass",
	indicatorLocation: "left",
};

withButton.storyName = "Cambio de estado manual";

const addRemoveAccordionsTPL = () => {
 	return `
		<script type="text/javascript">
			document.querySelector("#add").addEventListener("click", addAccordionItem("false"));
			document.querySelector("#addOpen").addEventListener("click", addAccordionItem("true"));
			document.querySelector("#delete").addEventListener("click", () => {
				const items = Array.from(document.querySelectorAll("pelayo-accordion-item"));
				items[items.length - 1].remove();
			});

			function addAccordionItem(open) {
				return () => {
					const accordion = document.querySelector("pelayo-accordion");
					const items = Array.from(document.querySelectorAll("pelayo-accordion-item"));

					const accordionItem = document.createElement("pelayo-accordion-item");
					accordionItem.setAttribute("heading", "Header " + (items.length + 1));
					accordionItem.setAttribute("is-open", open);
					accordionItem.textContent = "contenido";

					accordion.appendChild(accordionItem);
				};
			}
		</script>

		<div id="code-html">
			<pelayo-accordion close-others="true">
				<pelayo-accordion-item heading="Header I">
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
				</pelayo-accordion-item>

				<pelayo-accordion-item heading="Header II" is-open="true">
					<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi.</p>
				</pelayo-accordion-item>

				<pelayo-accordion-item heading="Header III">
					<p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.</p>
				</pelayo-accordion-item>
			</pelayo-accordion>

			<pelayo-button cssclass="btn-primary" id="add" value="Add pelayo-accordion-item" onclick="document.querySelector('pelayo-accordion-item').open();"></pelayo-button>
			<pelayo-button cssclass="btn-primary" id="addOpen" value="Add open pelayo-accordion-item" onclick="document.querySelector('pelayo-accordion-item').close();"></pelayo-button>
			<pelayo-button cssclass="btn-primary" id="delete" value="Delete last pelayo-accordion-item" onclick="document.querySelector('pelayo-accordion-item').close();"></pelayo-button>
		</div>
	`;
};

export const addRemoveAccordions = addRemoveAccordionsTPL.bind({});
addRemoveAccordions.args = {
	isDisabled: false,
	panelClass: "testClass",
	indicatorLocation: "left",
};

addRemoveAccordions.storyName = "Añadir y eliminar accordions";