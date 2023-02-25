import path from 'path';
import { Configuration } from 'webpack';

import BaseConfig from './webpack.base.config';

const config: Configuration = {
  ...BaseConfig,
  performance: { hints: false },
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].[contenthash].js',
    publicPath: '/gdm-cockpit/',
  },
};

export default config;