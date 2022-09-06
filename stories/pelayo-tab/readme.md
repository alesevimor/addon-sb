# pelayo-button



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute      | Description                                                                                                                                                        | Type      | Default     |
| ------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------- | ----------- |
| `customClass` | `custom-class` | Clase para dar estilos a esta pestaña.                                                                                                                             | `string`  | `undefined` |
| `disabled`    | `disabled`     |                                                                                                                                                                    | `boolean` | `false`     |
| `heading`     | `heading`      | Nombre de la pesatña.  También se puede especificar con HTML: <pelayo-tab>    <template html-heading>      <b>Nombre</b>    </template>    Contenido </pelayo-tab> | `string`  | `undefined` |
| `isDisabled`  | `is-disabled`  | Indica si la pestaña está deshabilitada.                                                                                                                           | `boolean` | `undefined` |
| `tabName`     | `tab-name`     | Nombre de la pestaña. Para hacer referencia a esta pestaña por nombre en vez de usar el index.                                                                     | `string`  | `undefined` |


## Events

| Event              | Description                                                                                         | Type               |
| ------------------ | --------------------------------------------------------------------------------------------------- | ------------------ |
| `disabledchange`   |                                                                                                     | `CustomEvent<any>` |
| `headingchange`    | Uso interno para comunicar al componente pelayo-tabset que se ha cambiado el nombre de la pestaña   | `CustomEvent<any>` |
| `pelayoTabDidLoad` | Uso interno para comunicar al componente pelayo-tabset que se ha añadido una pestaña dinámicamente. | `CustomEvent<any>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
