/* global __dirname */

const path = require('path');

const dir_js = path.resolve(__dirname, 'react_components');
const dir_build = path.resolve(__dirname, 'build');
const dir_dist = path.resolve(__dirname, 'dist');
const dir_node_modules = path.resolve(__dirname, 'node_modules');

const config = {
  entry: path.resolve(dir_js, 'index.js'),
  output: {
    path: dir_build,
    library: 'ReactPaginate',
    libraryTarget: 'umd',
    filename: 'react-paginate.js',
    globalObject: 'this',
    chunkLoading: false,
    wasmLoading: false,
  },
  devServer: {
    contentBase: dir_build,
  },
  module: {
    rules: [
      {
        use: 'react-hot-loader/webpack',
        test: dir_js,
        exclude: dir_node_modules,
      },
      {
        use: 'babel-loader',
        test: dir_js,
        exclude: dir_node_modules,
      },
    ],
  },
  externals: [
    {
      react: {
        root: 'React',
        amd: 'react',
        commonjs: 'react',
        commonjs2: 'react',
      },
    },
  ],
  stats: {
    colors: true,
  },
  devtool: 'source-map',
  mode: 'development',
};

module.exports = (env, argv) => {
  if (argv.mode === 'production') {
    config.mode = 'production',
    config.output.path = dir_dist;
    config.module.rules = config.module.rules.filter(rule => rule.use !== 'react-hot-loader/webpack');
  }
  return config;
}
