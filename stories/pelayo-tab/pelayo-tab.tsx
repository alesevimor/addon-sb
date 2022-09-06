import { Component, Element, Event, EventEmitter, h, Prop, Watch } from '@stencil/core';

@Component({
    tag: 'pelayo-tab',
    styleUrl: 'pelayo-tab.scss',
    shadow: true
})
export class PelayoTab {

    @Element() el: any;
    private _observer: MutationObserver;

    /**
     * Uso interno para comunicar al componente pelayo-tabset que se ha añadido una pestaña dinámicamente.
     */
    @Event() pelayoTabDidLoad: EventEmitter;

    /**
     * Uso interno para comunicar al componente pelayo-tabset que se ha cambiado el nombre de la pestaña
     */
    @Event({ eventName: 'headingchange' }) headingChange: EventEmitter;
    @Event({ eventName: 'disabledchange' }) disabledChange: EventEmitter;
    @Event({ eventName: 'errorstatuschange' }) errorStatusChange: EventEmitter;

    /**
     * Nombre de la pesatña.
     *
     * También se puede especificar con HTML:
        * <!--
            * <pelayo-tab>
            *   <template html-heading>
            *     <b>Nombre</b>
            *   </template>
            *   Contenido
            * </pelayo-tab>
        * -->
     */
    @Prop() heading: string;

    /**
     * Clase para dar estilos a esta pestaña.
     */
    @Prop() customClass: string;

    /**
     * Nombre de la pestaña. Para hacer referencia a esta pestaña por nombre en vez de usar el index.
     */
    @Prop() tabName: string;

    /**
     * Indica si la pestaña está deshabilitada.
     */
    @Prop() isDisabled: boolean;

    /**
     * Indica si la pestaña contiene errores.
     */
    @Prop() containsError: boolean;

    @Prop({ reflect: true }) disabled = false;


    @Watch('heading')
    headingWatcher(newValue: string) {
        this.headingChange.emit(newValue);
    }

    @Watch('isDisabled')
    isDisabledWatcher(newValue: boolean) {
        this.disabled = newValue;
        this.disabledChange.emit(newValue);
    }

    @Watch('disabled')
    disabledWatcher(newValue: boolean) {
        this.isDisabled = newValue;
        this.disabledChange.emit(newValue);
    }

    @Watch('containsError')
    errorWatcher(newValue: boolean) {
        this.containsError = newValue;
        this.errorStatusChange.emit(newValue);
    }

    componentDidLoad() {
        this.pelayoTabDidLoad.emit(this);
        const template = this.el.querySelector('[html-heading]');
        if (template) {
            this._observer = new MutationObserver((mutations) => this.ctrlTabHeader(mutations));
            this._observer.observe(template, { childList: true, attributes: true, subtree: true });
        }
    }

    disconnectedCallback() {
        this._observer?.disconnect();
    }

    /**
     * Gestiona los cambios de las cabeceras injectadas por html dinámicamente.
     */
    private ctrlTabHeader(mutations: MutationRecord[]) {
        mutations.forEach((mutation: MutationRecord) => {
            const hasRemovedNodes = mutation.removedNodes.length;
            const hasAddedNodes = mutation.addedNodes.length;
            if (mutation.type === 'attributes' || hasRemovedNodes || hasAddedNodes) {
                this.headingChange.emit({});
            }
        });
    }

    render() {
        return (
            <slot></slot>
        );
    }

}
