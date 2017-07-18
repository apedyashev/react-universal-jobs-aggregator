// Webpack config for development
var fs = require('fs');
var path = require('path');
var webpack = require('webpack');
var precss = require('precss');
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var assetsPath = path.resolve(__dirname, '../static/dist');
var srcPath = path.resolve(__dirname, '../src');
var host = (process.env.HOST || 'localhost');
var port = (+process.env.PORT + 1) || 3001;

// https://github.com/halt-hammerzeit/webpack-isomorphic-tools
var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
var webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools'))
.development();

var babelrc = fs.readFileSync('./.babelrc');
var babelrcObject = {};

try {
  babelrcObject = JSON.parse(babelrc);
} catch (err) {
  console.error('==>     ERROR: Error parsing your .babelrc.');
  console.error(err);
}


var babelrcObjectDevelopment = babelrcObject.env && babelrcObject.env.development || {};

// merge global and dev-only plugins
var combinedPlugins = babelrcObject.plugins || [];
combinedPlugins = combinedPlugins.concat(babelrcObjectDevelopment.plugins);

var babelLoaderQuery = Object.assign({}, babelrcObjectDevelopment, babelrcObject, {plugins: combinedPlugins});
delete babelLoaderQuery.env;

// Since we use .babelrc for client and server, and we don't want HMR enabled on the server, we have to add
// the babel plugin react-transform-hmr manually here.

// make sure react-transform is enabled
babelLoaderQuery.plugins = babelLoaderQuery.plugins || [];
var reactTransform = null;
for (var i = 0; i < babelLoaderQuery.plugins.length; ++i) {
  var plugin = babelLoaderQuery.plugins[i];
  if (Array.isArray(plugin) && plugin[0] === 'react-transform') {
    reactTransform = plugin;
  }
}

if (!reactTransform) {
  reactTransform = ['react-transform', {transforms: []}];
  babelLoaderQuery.plugins.push(reactTransform);
}

if (!reactTransform[1] || !reactTransform[1].transforms) {
  reactTransform[1] = Object.assign({}, reactTransform[1], {transforms: []});
}

// make sure react-transform-hmr is enabled
reactTransform[1].transforms.push({
  transform: 'react-transform-hmr',
  imports: ['react'],
  locals: ['module']
});

module.exports = {
  devtool: 'inline-source-map',
  context: path.resolve(__dirname, '..'),
  entry: {
    'main': [
      'webpack-hot-middleware/client?path=http://' + host + ':' + port + '/__webpack_hmr',
      'bootstrap-loader',
      './src/client.js'
    ]
  },
  output: {
    path: assetsPath,
    filename: '[name]-[hash].js',
    chunkFilename: '[name]-[chunkhash].js',
    publicPath: 'http://' + host + ':' + port + '/dist/'
  },
  module: {
    rules: [
      { test: /\.jsx?$/, exclude: /node_modules/, use: [
        {
          loader: 'babel-loader',
          options: babelLoaderQuery
        },
        // {loader: 'eslint-loader'}
        // 'babel?' + JSON.stringify(babelLoaderQuery), 'eslint-loader'
      ]},
      { test: /\.less$/, use: [
        {loader: 'style-loader'},
        {loader: 'css-loader', options: {
          modules: true,
          importLoaders: 2,
          sourceMap: true,
          localIdentName: '[local]___[hash:base64:5]',
        }},
        {
          loader: 'postcss-loader'
        },
        {loader: 'less-loader', options: {
          outputStyle: 'expanded',
          sourceMap: true
        }},
        // 'style!css?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!postcss-loader!less?outputStyle=expanded&sourceMap'
      ]},
      { test: /\.scss$/,
        use: [
          {loader: 'style-loader'},
          {loader: 'css-loader', options: {
            modules: true,
            importLoaders: 2,
            sourceMap: true,
            localIdentName: '[local]___[hash:base64:5]',
          }},
          {
            loader: 'postcss-loader'
          },
          {loader: 'sass-loader', options: {
            outputStyle: 'expanded',
            sourceMap: true
          }},
        ]
      },//'style!css?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!postcss-loader!sass?outputStyle=expanded&sourceMap'
      { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, use: [
        {loader: 'url-loader', options: {
          limit: 10000,
          mimetype: 'application/font-woff'
        }}
      ]},
        //"url?limit=10000&mimetype=application/font-woff"
      { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, use: [
        {loader: 'url-loader', options: {
          limit: 10000,
          mimetype: 'application/font-woff'
        }}
      ]},
      //"url?limit=10000&mimetype=application/font-woff"
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, use: [
        {loader: 'url-loader', options: {
          limit: 10000,
          mimetype: 'application/octet-stream'
        }}
      ]},
        //"url?limit=10000&mimetype=application/octet-stream"
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, use: [{loader: 'file-loader'}] },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, use: [{
        loader: 'url-loader',
        options: {
          limit: 10000,
          mimetype: 'image/svg+xml'
        }
      }]},
        //"url?limit=10000&mimetype=image/svg+xml"
      { test: webpackIsomorphicToolsPlugin.regular_expression('images'), use: [
        {loader: 'url-loader', options: {limit: 10240}}
      ]}
      //'url-loader?limit=10240'
    ]
  },
  // postcss: function () {
  //   return [precss, autoprefixer];
  // },
  // progress: true,
  resolve: {
    modules: [
      'src',
      'node_modules'
    ],
    //https://webpack.js.org/guides/migrating/#resolve-extensions
    extensions: [/*'', */'.json', '.js', '.jsx']
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        context: srcPath,
        postcss: function() {
          return {
            plugins: [precss, autoprefixer]
          };
        }
      }
    }),
    // hot reload
    new webpack.HotModuleReplacementPlugin(),
    new webpack.IgnorePlugin(/webpack-stats\.json$/),
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: true,
      __DEVTOOLS__: true  // <-------- DISABLE redux-devtools HERE
    }),
    webpackIsomorphicToolsPlugin.development(),
  ]
};

// postcss: function () {
//   return [precss, autoprefixer];
// },
