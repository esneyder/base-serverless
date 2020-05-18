const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = function(webpackConfig) {
  if (webpackConfig.entry["_warmup/index"]) {
    delete webpackConfig.entry["_warmup/index"];
    webpackConfig.plugins.push(
      new CopyWebpackPlugin([
        {
          from: path.join("", "_warmup"),
          to: "_warmup"
        }
      ])
    );
  }

  return webpackConfig;
};
