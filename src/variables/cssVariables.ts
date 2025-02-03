/** @desc Re-export parsed and typed scss variables to ts code */

import * as cssVariables from './variables-export.scss';

// See pre-exports in `variables-export.scss`
export interface TVariables {
  appId: string;
  appFolder: string;
  uploadsFolder: string;
}

const vars = cssVariables as TVariables;

const {
  // prettier-ignore
  appId,
  appFolder,
  uploadsFolder,
} = vars;

export {
  // prettier-ignore
  appId,
  appFolder,
  uploadsFolder,
};
