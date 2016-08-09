var path = require('path');

module.exports = {
    entry: [
      "webpack-dev-server/client?http://0.0.0.0:4004",
      "webpack/hot/dev-server",
      "./src/Main.js"
    ],

    output: {
        filename: './site/bundle.js'
    },
    module: {
        loaders: [
            // { test: /\.css$/, loader: 'style!css' },
            { test: /\.css$/, loader: "style-loader!css-loader" },
            {
              test: /\.jsx?$/,
              exclude: /(node_modules|bower_components)/,
              loader: 'babel', // 'babel-loader' is also a legal name to reference
              //query: {
              //  presets: ['es2015','stage-0']
              //}
            }


        ]
    },
    resolve: {
        root: [
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, 'vendors'),
        ],
        alias: {
          'TweenLite': 'gsap/src/minified/TweenLite.min.js'
        }
    },
    devtool: 'source-map'
}
