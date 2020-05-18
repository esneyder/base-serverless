const path = require("path");
const webpack = require("webpack");
const slsw = require("serverless-webpack");
const HardSourceWebpackPlugin = require("hard-source-webpack-plugin");

const babelConfig = require("../../../../.babelrc");
const ignoreWarmupPlugin = require("./ignore-warmup-plugin");

const isLocal = slsw.lib.webpack.isLocal;

const servicePath = slsw.lib.serverless.config.servicePath;

const ENABLE_STATS = false;
const ENABLE_CACHING = isLocal;

function resolveEntriesPath(entries) {
  for (let key in entries) {
    entries[key] = path.join(servicePath, entries[key]);
  }

  return entries;
}

function babelLoader() {
  return {
    loader: "babel-loader",
    options: {
      // Enable caching
      cacheDirectory: ENABLE_CACHING,
      // Disable compresisng cache files to speed up caching
      cacheCompression: false,
      ...babelConfig
    }
  };
}

function loaders() {
  const loaders = {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [babelLoader()]
      }
    ]
  };

  return loaders;
}

function plugins() {
  const plugins = [];

  if (ENABLE_CACHING) {
    plugins.push(
      new HardSourceWebpackPlugin({
        info: {
          mode: ENABLE_STATS ? "test" : "none",
          level: ENABLE_STATS ? "debug" : "error"
        }
      })
    );
  }

  // Ignore all locale files of moment.js
  plugins.push(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/));

  return plugins;
}

module.exports = ignoreWarmupPlugin({
  entry: resolveEntriesPath(slsw.lib.entries),
  target: "node",
  // context: __dirname,
  // Disable verbose logs
  stats: ENABLE_STATS ? "normal" : "errors-only",
  devtool: "source-map",
  // Exclude "aws-sdk" since it's a built-in package
  externals: ["aws-sdk"],
  mode: isLocal ? "development" : "production",
  performance: {
    // Turn off size warnings for entry points
    hints: false
  },
  resolve: {
    // Performance
    symlinks: false,
    // First start by looking for modules in the plugin's node_modules
    // before looking inside the project's node_modules.
    modules: [path.resolve(__dirname, "node_modules"), "node_modules"]
  },
  // Add loaders
  module: loaders(),
  // PERFORMANCE ONLY FOR DEVELOPMENT
  optimization: isLocal
    ? {
        removeAvailableModules: false,
        removeEmptyChunks: false,
        splitChunks: false
      }
    : // Don't minimize in production
      // Large builds can run out of memory
      { minimize: false },
  plugins: plugins(),
  output: {
    libraryTarget: "commonjs2",
    path: path.join(slsw.lib.serverless.config.servicePath, ".webpack"),
    filename: "[name].js",
    sourceMapFilename: "[file].map"
  }
});
