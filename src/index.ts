import { StencilJsonDocs } from './models/stencil-doc';
import docJson from './docs.json';

if (module && module.hot && module.hot.decline) {
  module.hot.decline();
}

/**
 * This method works for set stencil json doc.
 * @param stencilDocJson stencil json doc
 */
export const setStencilDocJson = (stencilDocJson: StencilJsonDocs): void => {
  // @ts-ignore
  window.__STORYBOOK_STENCIL_DOC_JSON__ = stencilDocJson;
};

/**
 * This method works for get stencil json doc.
 */
// @ts-ignore
export const getStencilDocJson = (): StencilJsonDocs => window.__STORYBOOK_STENCIL_DOC_JSON__;

// make it work with --isolatedModules
export default {};

/**
 * Just use start-dev mode.
 */
setStencilDocJson(docJson);