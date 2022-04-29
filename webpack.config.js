  
const path = require("path");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = {
  entry: { index: path.resolve(__dirname, "src", "index.js") },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: new RegExp(`eslint\\${path.sep}lib\\${path.sep}load-rules\\.js$`),
        loader: "string-replace-loader",
        options: {
            search: "[\\s\\S]+", // whole file.
            replace: "module.exports = () => ({})",
            flags: "g",
        },
      },
    ]
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 3000,
  },
  plugins: [
      new NodePolyfillPlugin()
  ],
  mode: 'development'
};
