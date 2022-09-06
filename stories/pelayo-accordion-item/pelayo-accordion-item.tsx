import { Component, Element, Event, EventEmitter, h, Host, Method, Prop } from '@stencil/core';
import { IndicatorLocation } from './indicator-location';

@Component({
    tag: 'pelayo-accordion-item',
    styleUrl: 'pelayo-accordion-item.scss',
    shadow: true
})
export class PelayoAccordionItem {

    private panelCollapse: HTMLElement;
    private readonly collapsedClass = 'collapsed';

    @Element() private readonly el: HTMLElement;

    /**
     * Evento interno para indicar a pelayo-accordion si se ha abierto pelayo-accordion-item
     */
    @Event() pelayoAccordionItemStatusChange: EventEmitter;

    /**
     * Emitir si se abre pelayo-accordion-item
     */
    @Event() isOpenChange: EventEmitter;

    /**
     * Comunica a pelayo-accordion si accordion-item se cargó
     */
    @Event() pelayoAccordionItemDidLoad: EventEmitter;

    /**
     * Texto de encabezado
     */
    @Prop() heading = '';

    /**
     * Si se abre el accordion-item
     */
    @Prop() isOpen = false;

    /**
     * Clases adicionales de estilizar
     */
    @Prop() panelClass = '';

    /**
     * Si accordion-item debe estar deshabilitado
     */
    @Prop() isDisabled = false;

    /**
     * Configuración de la localización del indicador
     * Valores: 'left', 'right' (Otro valor, ocultará el indicador)
     * Por defecto: 'left
     */
    @Prop() indicatorLocation: IndicatorLocation = 'left';

    /**
     * Toggle accordion-item
     */
    @Method()
    async toggle() {
        this.ctrlStatus('toggle');
    }

    /**
     * Abrir accordion-item
     */
    @Method()
    async open() {
        this.ctrlStatus('remove');
    }

    /**
     * Cerrar accordion-item
     */
    @Method()
    async close() {
        this.ctrlStatus('add');
    }

    /**
     * Cerrar pelayo-accordion-item sin llamar a pelayo-accordion.
     * Evita el bucle infinito..
     */
    @Method()
    async closeWithoutEmit() {
        this.ctrlStatus('add', false);
    }

    componentDidLoad() {
        this.panelCollapse = this.el.shadowRoot.querySelector('.panel-collapse'); // Set a reference for panel-collapse

        if (this.isOpen) { // Open accordion-item if is-open is true
            this.open();
        }

        this.pelayoAccordionItemDidLoad.emit(this); // Tell pelayo-accordion pelayo-accordion-item did load
    }

    // tslint:disable: no-redundant-jsdoc
    /**
     * Private function to control accordion-item status.
     *
     * @param {string} actionClass control collapsed class for panel-collapse.
     * @param {boolean} [emitStatus=true] if pelayo-accordion-item should tell pelayo-accordion that its state has changed.
     */
    private ctrlStatus(actionClass: string, emitStatusChange = true) {
        if (this.isDisabled) { return; }

        this.el.classList[actionClass](this.collapsedClass);

        this.setAccordionToggleState();

        this.isOpenChange.emit({ isOpen: !this.el.classList.contains(this.collapsedClass) });

        if (emitStatusChange) {
            this.pelayoAccordionItemStatusChange.emit();
        }
    }

    /**
     * Control accesibility for accordion-toggle
     */
    private setAccordionToggleState() {
        this.el.shadowRoot
            .querySelector('.accordion-toggle')
            .setAttribute('aria-expanded', this.panelCollapse.classList.contains(this.collapsedClass) ? 'false' : 'true');
    }

    /**
     * Set heading classes
     */
    private setHeadingClasses(isDisabled: boolean): string {
        return `panel-heading ${isDisabled ? 'disabled' : ''}`;
    }

    /**
     * Set host classes
     */
    private setHostClasses() {
        return `${this.panelClass} ${this.collapsedClass}`;
    }

    render() {
        return (
            <Host class={this.setHostClasses()}>
                <div class={this.setHeadingClasses(this.isDisabled)} role='tab'>
                    <div role='button'
                        onClick={ this.toggle.bind(this) }
                        class={{
                            'accordion-toggle': true,
                            'toggle-indicator-left': this.indicatorLocation === 'left',
                            'toggle-indicator-right': this.indicatorLocation === 'right'
                        }}
                        tabindex='0'>
                        {
                            this.heading &&
                            <span class='accordion-toggle-heading'>
                                {this.heading}
                            </span>
                        }
                        <slot name='accordion-heading'/>
                    </div>
                </div>
                <div class='panel-collapse' role='tabpanel'>
                    <div class='panel-body'>
                        <slot/>
                    </div>
                </div>
            </Host>
        );
    }

}
