import { newE2EPage, newSpecPage } from '@stencil/core/testing';
import { PelayoAccordionItem } from './pelayo-accordion-item';

describe('pelayo-accordion-item render', () => {

    it('should render collapsed', async () => {
        const page = await newSpecPage({
            components: [PelayoAccordionItem],
            html: `
                <pelayo-accordion-item>
                </pelayo-accordion-item>
            `,
        });

        expect(page.root)
            .toHaveClass('collapsed');
    });

    it('should render heading', async () => {
        const page = await newSpecPage({
            components: [PelayoAccordionItem],
            html: `
                <pelayo-accordion-item heading="heading">
                </pelayo-accordion-item>
            `,
        });

        expect(page.root.shadowRoot.querySelector('.accordion-toggle').textContent)
            .toContain(page.rootInstance.heading);
    });

    it('should render slots', async () => {
        const page = await newSpecPage({
            components: [PelayoAccordionItem],
            html: `
                <pelayo-accordion-item indicator-location="none">
                    <p slot="accordion-heading">accordion-heading</p>
                    <p>contenido</p>
                </pelayo-accordion-item>
            `,
        });

        expect(page.root).toEqualHtml(`
            <pelayo-accordion-item indicator-location="none" class="collapsed">
                <mock:shadow-root>
                    <div class="panel-heading" role="tab">
                        <div role="button" class="accordion-toggle" tabindex='0'>
                            <slot name="accordion-heading"></slot>
                        </div>
                    </div>
                    <div class="panel-collapse" role="tabpanel">
                        <div class="panel-body">
                            <slot></slot>
                        </div>
                    </div>
                </mock:shadow-root>

                <p slot="accordion-heading">accordion-heading</p>
                <p>contenido</p>
            </pelayo-accordion-item>
        `);
    });

    it('should render opened accordion item', async () => {
        const page = await newSpecPage({
            components: [PelayoAccordionItem],
            html: `
                <pelayo-accordion-item is-open="true">
                </pelayo-accordion-item>
            `
        });

        expect(page.root.className)
            .not.toContain(page.rootInstance.collapsedClass);

    });

});

describe('pelayo-accordion-item behavior', () => {
    let page;

    beforeEach(async() => {
        page = await newSpecPage({
            components: [PelayoAccordionItem],
            html: `
                <pelayo-accordion-item>
                </pelayo-accordion-item>
            `,
        });
    });

    it('setHeadingClasses function', () => {
        expect(page.rootInstance.setHeadingClasses(true))
            .toEqualText('panel-heading disabled');
        expect(page.rootInstance.setHeadingClasses(false))
            .toEqualText('panel-heading');
    });

    it('setHostClasses function', () => {
        expect(page.rootInstance.setHostClasses())
            .toEqualText(`${page.rootInstance.collapsedClass}`);

        page.root.setAttribute('panel-class', 'test-class');

        expect(page.rootInstance.setHostClasses())
            .toEqualText(`${page.rootInstance.panelClass} ${page.rootInstance.collapsedClass}`);
    });

    it('should open accordion item', () => {
        page.rootInstance.open();
        expect(page.root)
            .not.toHaveClass(page.rootInstance.collapsedClass);
    });

    it('should close accordion item', () => {
        page.rootInstance.open();
        page.rootInstance.close();
        expect(page.root)
            .toHaveClass(page.rootInstance.collapsedClass);
    });

    it('should disable accordion item', () => {
        page.root.setAttribute('is-disabled', true);
        page.rootInstance.open();
        expect(page.root)
            .toHaveClass(page.rootInstance.collapsedClass);
    });

    it('should toggle accordion item', () => {
        page.rootInstance.open();

        page.rootInstance.toggle();
        expect(page.root)
            .toHaveClass(page.rootInstance.collapsedClass);

        page.rootInstance.toggle();
        expect(page.root)
            .not.toHaveClass(page.rootInstance.collapsedClass);
    });

});

describe('pelayo-accordion-item e2e', () => {

    let page,
        isOpenChange,
        pelayoAccordionItemStatusChange,
        item;

    beforeEach(async() => {
        page = await newE2EPage({ url: '/' });

        await page.setContent(`
            <pelayo-accordion-item>
            </pelayo-accordion-item>
        `);

        isOpenChange = await page.spyOnEvent('isOpenChange');
        pelayoAccordionItemStatusChange = await page.spyOnEvent('pelayoAccordionItemStatusChange');

        item = await page.find('pelayo-accordion-item');
    });

    it('should emit isOpenChange and pelayoAccordionItemStatus', async () => {

        item.callMethod('open');
        await page.waitForChanges();

        expect(isOpenChange).toHaveReceivedEventDetail({ isOpen: true });
        expect(pelayoAccordionItemStatusChange).toHaveReceivedEventDetail(null);
    });

    it('should emit isOpenChange but shouldnt emit pelayoAccordionItemStatus', async () => {

        item.callMethod('closeWithoutEmit');

        await page.waitForChanges();

        expect(isOpenChange).toHaveReceivedEventDetail({ isOpen: false });
        expect(pelayoAccordionItemStatusChange)
            .not.toHaveReceivedEvent();
    });
});
