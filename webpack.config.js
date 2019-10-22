const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: "./src/app.module.js",
  output: {
    path: __dirname + "/dist",
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: 'raw-loader'
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      }
    ],
  },
  /* devServer: {
    proxy: {
      '/api': 'http://localhost:3000'
    }
  }, */
  plugins: [new ExtractTextPlugin("bundle.css")],
};
