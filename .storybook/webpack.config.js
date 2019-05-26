const path = require("path");

module.exports = ({ config }) => {
  config.module.rules = config.module.rules.filter(
    it => String(it.test).indexOf("svg") == -1
  );

  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    include: path.resolve(__dirname, "../src"),
    loader: require.resolve("ts-loader")
  });

  config.module.rules.push({
    test: /\.svg$/,
    loader: "file-loader"
  });

  config.resolve.extensions.push(".ts", ".tsx");

  return config;
};
