import path from 'path';
import { Configuration as WebpackConfiguration, HotModuleReplacementPlugin } from 'webpack';
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';

import BaseConfig from './webpack.base.config';

const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const withReport = process.env.npm_config_withreport;
interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}

const config: Configuration = {
  ...BaseConfig,
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.js',
    clean: true,
  },
  plugins: [
    ...(BaseConfig.plugins as Array<any>),
    new HotModuleReplacementPlugin(), withReport ? new BundleAnalyzerPlugin() : () => {},
  ],
  devtool: 'inline-source-map',
  devServer: {
    static: path.resolve(__dirname, './dist'),
    historyApiFallback: true,
    allowedHosts: 'all',
    port: 4000,
    open: false,
    hot: true,
  },
};

export default config;