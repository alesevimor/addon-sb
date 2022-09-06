import { StencilJsonDocs } from './models/stencil-doc-model';
import docJson from './docs.json';

if (module && module.hot && module.hot.decline) {
  module.hot.decline();
}

/**
 * @param stencilDocJson stencil json doc
 */
export const setStencilDocJson = (stencilDocJson: StencilJsonDocs): void => {
  // @ts-ignore
  window.__STORYBOOK_STENCIL_DOC_JSON__ = stencilDocJson;
};

// @ts-ignore
export const getStencilDocJson = (): StencilJsonDocs => window.__STORYBOOK_STENCIL_DOC_JSON__;

// make it work with --isolatedModules
export default {};

setStencilDocJson(docJson);