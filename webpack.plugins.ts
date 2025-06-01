import type IForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import { DefinePlugin } from 'webpack';
 
// eslint-disable-next-line @typescript-eslint/no-var-requires
const ForkTsCheckerWebpackPlugin: typeof IForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

export const plugins = [
  new ForkTsCheckerWebpackPlugin({
    logger: 'webpack-infrastructure',
  }),
  new DefinePlugin({
    "typeof CANVAS_RENDERER": JSON.stringify(true),
    "typeof WEBGL_RENDERER": JSON.stringify(true),
    "typeof WEBGL_DEBUG": JSON.stringify(true),
    "typeof EXPERIMENTAL": JSON.stringify(true),
    "typeof PLUGIN_3D": JSON.stringify(false),
    "typeof PLUGIN_CAMERA3D": JSON.stringify(false),
    "typeof PLUGIN_FBINSTANT": JSON.stringify(false),
    "typeof FEATURE_SOUND": JSON.stringify(true),
    "isDev": process.argv.includes('--dev') ? true : false
  })
];
