# pelayo-section



<!-- Auto Generated Below -->


## Properties

| Property            | Attribute            | Description                                                                                | Type                | Default  |
| ------------------- | -------------------- | ------------------------------------------------------------------------------------------ | ------------------- | -------- |
| `heading`           | `heading`            | Heading text                                                                               | `string`            | `''`     |
| `indicatorLocation` | `indicator-location` | Set indicator location Value: 'left', 'right' (Other value hides indicator) Default: 'left | `"left" \| "right"` | `'left'` |
| `isDisabled`        | `is-disabled`        | If accordion-item is disabled                                                              | `boolean`           | `false`  |
| `isOpen`            | `is-open`            | If accordion-item is opened                                                                | `boolean`           | `false`  |
| `panelClass`        | `panel-class`        | Additional classes for style                                                               | `string`            | `''`     |


## Events

| Event                             | Description                                                                      | Type               |
| --------------------------------- | -------------------------------------------------------------------------------- | ------------------ |
| `isOpenChange`                    | Emit if pelayo-accordion-item is opened                                          | `CustomEvent<any>` |
| `pelayoAccordionItemDidLoad`      | To tell pelayo-accordion if accordio-item did load                               | `CustomEvent<any>` |
| `pelayoAccordionItemStatusChange` | Internal event to tell pelayo-accordion if pelayo-accordion-item has been opened | `CustomEvent<any>` |


## Methods

### `close() => Promise<void>`

Close accordion-item

#### Returns

Type: `Promise<void>`



### `closeWithoutEmit() => Promise<void>`

Close pelayo-accordion-item without telling pelayo-accordion.
It avoids infinite loop.

#### Returns

Type: `Promise<void>`



### `open() => Promise<void>`

Open accordion-item

#### Returns

Type: `Promise<void>`



### `toggle() => Promise<void>`

Toggle accordion-item

#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
