// @ts-check

/** @module Webpack params
 *  @since 2024.10.07, 00:00
 *  @changed 2024.10.20, 17:14
 */

const fs = require('fs');
const path = require('path');

const isDev = getTruthy(process.env.DEV);
const isDebug = getTruthy(process.env.DEBUG);

/** Use locally served assets (only for debug mode) */
const useLocalServedScripts = true;

const useInlineScripts = !useLocalServedScripts;

/** Create source maps for production mode (not dev) */
const generateSourcesForProduction = true;

const includeTemplateFile = 'src/include-template.html';
// const previewTemplateFile = 'src/preview-template-with-column.html';
const previewTemplateFile = 'src/preview-template-no-column.html';

const appInfoFile = 'src/project-info.json';
const appInfoContent = fs.readFileSync(path.resolve(__dirname, appInfoFile), {
  encoding: 'utf8',
});
const appInfo = JSON.parse(appInfoContent);
const { projectInfo } = appInfo;
const appVersionHash = projectInfo;
// fsproperty-landing-area-page v.0.0.0 / 2025.02.03 19:41:02 +0300
const matches = projectInfo.match(/^(\S+) v\.(\S+) \/ (.*)$/);
matches.shift();
// 'fsproperty-landing-area-page', '0.0.0', '2025.02.03 19:41:02 +0300'
const [projectId, version, timestamp] = matches;
const timetag = timestamp.replace(/^..(\d+)\.(\d+)\.(\d+)[, -]*(\d+):(\d+).*/, '$1$2$3-$4$5');
const appVersionTag = 'v.' + version + '-' + timetag;
const outPath = isDev ? 'build-dev' : 'build';

const appId = 'landing-area';
const appFolder = `${appId}`;
const uploadsFolder = `uploads/${appFolder}`;

/** Assets target path */
const assetsPath = `${uploadsFolder}/`;

const scriptsAssetFile = assetsPath + 'scripts.js';
const stylesAssetFile = assetsPath + 'styles.css';

const localServerPrefix = '/'; // http://localhost:3000/';

// @see https://webpack.js.org/configuration/devtool/#devtool
const devtool = isDev
  ? useInlineScripts
    ? 'inline-source-map'
    : 'source-map'
  : generateSourcesForProduction
    ? 'source-map'
    : undefined;
const minimizeAssets = !isDev || !useLocalServedScripts;

// Inluce other resources here, to protect webpack from changing the urls (and trying to find the resource and include to the build)
const customResources = [
  // '<link rel="stylesheet" type="text/css" href="/assets/b7f4f2a8/css/about.css">',
  // '<script src="https://cdn.jsdelivr.net/npm/bootstrap3@3.3.5/dist/js/bootstrap.min.js"></script>',
]
  .filter(Boolean)
  .join('\n');

// Info:
console.log('DEV:', isDev); // eslint-disable-line no-console
console.log('DEBUG:', isDebug); // eslint-disable-line no-console
console.log('VERSION:', appVersionHash); // eslint-disable-line no-console
console.log('devtool:', devtool); // eslint-disable-line no-console
console.log('outPath:', outPath); // eslint-disable-line no-console

// Core helpers...

/** @param {boolean|string|number|undefined|null} val */
function getTruthy(val) {
  if (!val || val === 'false' || val === '0') {
    return false;
  }
  return true;
}

// Export parameters...
module.exports = {
  isDev,
  isDebug,

  useLocalServedScripts,
  useInlineScripts,

  includeTemplateFile,
  previewTemplateFile,

  generateSourcesForProduction,

  appInfoFile,
  appInfoContent,
  appInfo,
  appVersionHash,
  appVersionTag,

  outPath,

  projectId,
  appId,
  appFolder,
  uploadsFolder,

  scriptsAssetFile,
  stylesAssetFile,

  localServerPrefix,

  devtool,
  minimizeAssets,

  customResources,
};
