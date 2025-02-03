// @ts-check

/** @module Webpack config
 *  @since 2024.10.07, 00:00
 *  @changed 2024.10.21, 11:09
 */

const webpack = require('webpack');

const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');

const fs = require('fs');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { getIncludeFragment } = require('./webpack.helpers');
const {
  isDev,
  isDebug,
  appInfoFile,
  useLocalServedScripts,
  appVersionHash,
  outPath,
  includeTemplateFile,
  previewTemplateFile,
  devtool,
  minimizeAssets,
  scriptsAssetFile,
  stylesAssetFile,
  appFolder,
  uploadsFolder,
} = require('./webpack.params');

/** Exclusions for copy plugin */
const globOptions = {
  // dot: true,
  gitignore: true,
  // ignore: ['**/file.*', '**/ignored-directory/**'],
};

module.exports = {
  mode: 'production',
  // @see https://webpack.js.org/configuration/devtool/#devtool
  devtool,
  entry: [
    // NOTE: See also `files` field in `tsconfig.json`
    './src/root.ts',
    // './src/styles.scss',
    // includeTemplateFile,
  ],
  resolve: {
    extensions: ['.scss', '.sass', '.css', '.tsx', '.ts', '.js', '.svg'],
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.tsx?$/,
        // @see https://github.com/TypeStrong/ts-loader
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: false,
            },
          },
          // Translates CSS into CommonJS
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              // modules: true,
              modules: {
                // compileType: 'icss',
                // mode: 'local',
                mode: 'icss',
              },
              sourceMap: true,
              url: true,
            },
          },
          {
            loader: 'resolve-url-loader',
            options: {
              sourceMap: true,
            },
          },
          // Compiles Sass to CSS
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              /* // NOTE: Inject 'use' for math and color features, import common variables and mixins.
               * additionalData: [
               *   // '@use "sass:math";',
               *   // '@use "sass:color";',
               *   // '@import "src/variables.scss";',
               *   // '@import "src/mixins.scss";',
               * ]
               *   .filter(Boolean)
               *   .join('\n'),
               */
              api: 'modern',
              sassOptions: {
                // @see https://github.com/sass/node-sass#outputstyle
                outputStyle: minimizeAssets ? 'compressed' : 'expanded',
                quietDeps: true,
                // silenceDeprecations: [
                //   // @see node_modules/sass/types/deprecations.d.ts
                //   'import',
                //   'color-functions',
                //   'global-builtin',
                // ],
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
        // More information here https://webpack.js.org/guides/asset-modules/
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 64 * 1024, // 4kb
          },
        },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.DEV': isDev,
      'process.env.DEBUG': isDebug,
      'process.env.APP_VERSION': JSON.stringify(appVersionHash),
    }),
    new MiniCssExtractPlugin({
      filename: stylesAssetFile,
    }),
    new CopyPlugin({
      // @see https://webpack.js.org/plugins/copy-webpack-plugin/
      // TODO: Exclude log, swap & temp files
      patterns: [
        // Files to copy...
        { from: appInfoFile },
        { from: appInfoFile, to: `uploads/${appFolder}/` },
        { from: 'src/images', to: `uploads/${appFolder}/images`, globOptions },
        { from: 'public', globOptions },
        { from: 'public-uploads', to: uploadsFolder, globOptions },
      ],
    }),
    new HtmlWebpackPlugin({
      template: includeTemplateFile,
      filename: 'include.html',
      inject: false,
      minify: false,
      templateContent: (args) => {
        /** @type {webpack.Compilation} */
        const compilation = args.compilation;
        // Get scripts chunk content...
        const includeFragment = getIncludeFragment(compilation, {
          isDev,
          isDebug,
          useLocalServedScripts,
        });
        return [
          // Combine template...
          '<!-- ' + appVersionHash + ' -->',
          '',
          includeFragment,
          '',
        ].join('\n');
      },
    }),
    new HtmlWebpackPlugin({
      template: includeTemplateFile,
      filename: 'index.html',
      inject: false,
      minify: false,
      templateContent: (args) => {
        /** @type {webpack.Compilation} */
        const compilation = args.compilation;
        // Get scripts chunk content...
        const includeFragment = getIncludeFragment(compilation, {
          isDev,
          isDebug,
          useLocalServedScripts,
        });
        const previewFragment = fs
          .readFileSync(path.resolve(__dirname, previewTemplateFile), {
            encoding: 'utf8',
          })
          .trim()
          .replace('{{CONTENT}}', includeFragment);
        return [
          // Combine template...
          '<!-- ' + appVersionHash + ' -->',
          '',
          previewFragment,
          '',
        ].join('\n');
      },
    }),
  ],
  optimization: {
    minimize: minimizeAssets,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
        // exclude: 'assets',
        terserOptions: {
          compress: {
            drop_debugger: false,
          },
        },
      }),
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.sharpMinify,
          options: {
            /* resize: {
             *   enabled: true,
             *   width: 5,
             *   unit: 'percent',
             * },
             */
            encodeOptions: {
              // Your options for `sharp`
              // https://sharp.pixelplumbing.com/api-output
            },
          },
        },
      }),
    ],
  },
  output: {
    filename: scriptsAssetFile,
    // NOTE: See also `outDir` field in `tsconfig.json`
    path: path.resolve(__dirname, outPath),
    // @see https://webpack.js.org/configuration/output/#outputassetmodulefilename
    assetModuleFilename: `uploads/${appFolder}/assets/[name]-[hash][ext][query]`,
  },
};
