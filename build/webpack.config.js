const webpack = require('webpack')
// const cssnano = require('cssnano')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const config = require('../config')
const debug = require('debug')('app:webpack:config')

const paths = config.utils_paths
const __DEV__ = config.globals.__DEV__
const __PROD__ = config.globals.__PROD__
const __TEST__ = config.globals.__TEST__

debug('Creating configuration.')
const webpackConfig = {
  name: 'client',
  target: 'web',
  devtool: config.compiler_devtool,
  resolve: {
    root: paths.client(),
    extensions: ['', '.js', '.jsx', '.json']
  },
  module: {}
}
// ------------------------------------
// Entry Points
// ------------------------------------
const APP_ENTRY = paths.client('main.js')

webpackConfig.entry = {
  app: __DEV__
    ? [APP_ENTRY].concat(`webpack-hot-middleware/client?path=${config.compiler_public_path}__webpack_hmr`)
    : [APP_ENTRY],
  vendor: config.compiler_vendors
}

// ------------------------------------
// Bundle Output
// ------------------------------------
webpackConfig.output = {
  filename: `[name].[${config.compiler_hash_type}].js`,
  path: paths.dist(),
  publicPath: config.compiler_public_path
}

// ------------------------------------
// Plugins
// ------------------------------------
webpackConfig.plugins = [
  new webpack.DefinePlugin(config.globals),
  new HtmlWebpackPlugin({
    template: paths.client('index.html'),
    hash: false,
    favicon: paths.client('static/favicon.ico'),
    filename: 'index.html',
    inject: 'body',
    minify: {
      collapseWhitespace: true
    }
  })
]

if (__DEV__) {
  debug('Enable plugins for live development (HMR, NoErrors).')
  webpackConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  )
} else if (__PROD__) {
  debug('Enable plugins for production (OccurenceOrder, Dedupe & UglifyJS).')
  webpackConfig.plugins.push(
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        unused: true,
        dead_code: true,
        warnings: false
      }
    })
  )
}

// Don't split bundles during testing, since we only want import one bundle
if (!__TEST__) {
  webpackConfig.plugins.push(
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor']
    })
  )
}

// ------------------------------------
// Loaders
// ------------------------------------
// JavaScript / JSON
webpackConfig.module.loaders = [{
  test: /\.(js|jsx)$/,
  exclude: /node_modules/,
  loader: 'babel',
  query: config.compiler_babel
}, {
    test: /\.json$/,
    loader: 'json'
  }]

// ------------------------------------
// Style Loaders
// ------------------------------------
// We use cssnano with the postcss loader, so we tell
// css-loader not to duplicate minimization.
const BASE_CSS_LOADER = 'css?modules&importLoaders=1&sourceMap&-minimize'
const AUTOPREFIXER_BROWSERS = [
  'Android 2.3',
  'Android >= 4',
  'Chrome >= 35',
  'Firefox >= 31',
  'Explorer >= 9',
  'iOS >= 7',
  'Opera >= 12',
  'Safari >= 7.1'
];

webpackConfig.module.loaders.push({
  test: /\.scss$/,
  exclude: null,
  loaders: [
    'style',
    BASE_CSS_LOADER,
    'postcss',
    'sass?sourceMap'
  ]
})
webpackConfig.module.loaders.push({
  test: /\.css$/,
  exclude: null,
  loaders: [
    'style',
    BASE_CSS_LOADER,
    'postcss?pack=default'
  ]
})

webpackConfig.sassLoader = {
  includePaths: paths.client('styles')
}

// webpackConfig.postcss = bundler => [
//   // cssnano({
//   //   autoprefixer: {
//   //     add: true,
//   //     remove: true,
//   //     browsers: [
//   //       'Android 2.3',
//   //       'Android >= 4',
//   //       'Chrome >= 35',
//   //       'Firefox >= 31',
//   //       'Explorer >= 9',
//   //       'iOS >= 7',
//   //       'Opera >= 12',
//   //       'Safari >= 7.1'
//   //     ]
//   //   },
//   //   discardComments: {
//   //     removeAll: true
//   //   },
//   //   discardUnused: false,
//   //   mergeIdents: false,
//   //   reduceIdents: false,
//   //   safe: true,
//   //   sourcemap: true
//   // }),
//   // Transfer @import rule by inlining content, e.g. @import 'normalize.css'
//   // https://github.com/postcss/postcss-import
//   require('postcss-import')({ addDependencyTo: bundler }),
//   // W3C variables, e.g. :root { --color: red; } div { background: var(--color); }
//   // https://github.com/postcss/postcss-custom-properties
//   require('postcss-custom-properties')(),
//   // W3C CSS Custom Media Queries, e.g. @custom-media --small-viewport (max-width: 30em);
//   // https://github.com/postcss/postcss-custom-media
//   require('postcss-custom-media')(),
//   // CSS4 Media Queries, e.g. @media screen and (width >= 500px) and (width <= 1200px) { }
//   // https://github.com/postcss/postcss-media-minmax
//   require('postcss-media-minmax')(),
//   // W3C CSS Custom Selectors, e.g. @custom-selector :--heading h1, h2, h3, h4, h5, h6;
//   // https://github.com/postcss/postcss-custom-selectors
//   require('postcss-custom-selectors')(),
//   // W3C calc() function, e.g. div { height: calc(100px - 2em); }
//   // https://github.com/postcss/postcss-calc
//   require('postcss-calc')(),
//   // Allows you to nest one style rule inside another
//   // https://github.com/jonathantneal/postcss-nesting
//   require('postcss-nesting')(),
//   // W3C color() function, e.g. div { background: color(red alpha(90%)); }
//   // https://github.com/postcss/postcss-color-function
//   require('postcss-color-function')(),
//   // Convert CSS shorthand filters to SVG equivalent, e.g. .blur { filter: blur(4px); }
//   // https://github.com/iamvdo/pleeease-filters
//   require('pleeease-filters')(),
//   // Generate pixel fallback for "rem" units, e.g. div { margin: 2.5rem 2px 3em 100%; }
//   // https://github.com/robwierzbowski/node-pixrem
//   require('pixrem')(),
//   // W3C CSS Level4 :matches() pseudo class, e.g. p:matches(:first-child, .special) { }
//   // https://github.com/postcss/postcss-selector-matches
//   require('postcss-selector-matches')(),
//   // Transforms :not() W3C CSS Level 4 pseudo class to :not() CSS Level 3 selectors
//   // https://github.com/postcss/postcss-selector-not
//   require('postcss-selector-not')(),
//   // Postcss flexbox bug fixer
//   // https://github.com/luisrudge/postcss-flexbugs-fixes
//   require('postcss-flexbugs-fixes')(),
//   // Add vendor prefixes to CSS rules using values from caniuse.com
//   // https://github.com/postcss/autoprefixer
//   require('autoprefixer')({ browsers: AUTOPREFIXER_BROWSERS })
// ]
webpackConfig.postcss = (bundler) => {
  return {
    default: [
      // Transfer @import rule by inlining content, e.g. @import 'normalize.css'
      // https://github.com/postcss/postcss-import
      require('postcss-import')({ addDependencyTo: bundler }),
      // W3C variables, e.g. :root { --color: red; } div { background: var(--color); }
      // https://github.com/postcss/postcss-custom-properties
      require('postcss-custom-properties')(),
      // W3C CSS Custom Media Queries, e.g. @custom-media --small-viewport (max-width: 30em);
      // https://github.com/postcss/postcss-custom-media
      require('postcss-custom-media')(),
      // CSS4 Media Queries, e.g. @media screen and (width >= 500px) and (width <= 1200px) { }
      // https://github.com/postcss/postcss-media-minmax
      require('postcss-media-minmax')(),
      // W3C CSS Custom Selectors, e.g. @custom-selector :--heading h1, h2, h3, h4, h5, h6;
      // https://github.com/postcss/postcss-custom-selectors
      require('postcss-custom-selectors')(),
      // W3C calc() function, e.g. div { height: calc(100px - 2em); }
      // https://github.com/postcss/postcss-calc
      require('postcss-calc')(),
      // Allows you to nest one style rule inside another
      // https://github.com/jonathantneal/postcss-nesting
      require('postcss-nesting')(),
      // W3C color() function, e.g. div { background: color(red alpha(90%)); }
      // https://github.com/postcss/postcss-color-function
      require('postcss-color-function')(),
      // Convert CSS shorthand filters to SVG equivalent, e.g. .blur { filter: blur(4px); }
      // https://github.com/iamvdo/pleeease-filters
      require('pleeease-filters')(),
      // Generate pixel fallback for "rem" units, e.g. div { margin: 2.5rem 2px 3em 100%; }
      // https://github.com/robwierzbowski/node-pixrem
      require('pixrem')(),
      // W3C CSS Level4 :matches() pseudo class, e.g. p:matches(:first-child, .special) { }
      // https://github.com/postcss/postcss-selector-matches
      require('postcss-selector-matches')(),
      // Transforms :not() W3C CSS Level 4 pseudo class to :not() CSS Level 3 selectors
      // https://github.com/postcss/postcss-selector-not
      require('postcss-selector-not')(),
      // Postcss flexbox bug fixer
      // https://github.com/luisrudge/postcss-flexbugs-fixes
      require('postcss-flexbugs-fixes')(),
      // Add vendor prefixes to CSS rules using values from caniuse.com
      // https://github.com/postcss/autoprefixer
      require('autoprefixer')({ browsers: AUTOPREFIXER_BROWSERS })
    ],
    sass: [
      require('autoprefixer')({ browsers: AUTOPREFIXER_BROWSERS })
    ]
  };
}

  // File loaders
  /* eslint-disable */
  webpackConfig.module.loaders.push(
    { test: /\.woff(\?.*)?$/, loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff' },
    { test: /\.woff2(\?.*)?$/, loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff2' },
    { test: /\.otf(\?.*)?$/, loader: 'file?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=font/opentype' },
    { test: /\.ttf(\?.*)?$/, loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/octet-stream' },
    { test: /\.eot(\?.*)?$/, loader: 'file?prefix=fonts/&name=[path][name].[ext]' },
    { test: /\.svg(\?.*)?$/, loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=image/svg+xml' },
    { test: /\.(png|jpg)$/, loader: 'file?name=img/[name].[hash].[ext]' }
  )
// { test: /\.(png|jpg)$/, loader: 'url?limit=8192' }
/* eslint-enable */

// ------------------------------------
// Finalize Configuration
// ------------------------------------
// when we don't know the public path (we know it only when HMR is enabled [in development]) we
// need to use the extractTextPlugin to fix this issue:
// http://stackoverflow.com/questions/34133808/webpack-ots-parsing-error-loading-fonts/34133809#34133809
if (!__DEV__) {
  debug('Apply ExtractTextPlugin to CSS loaders.')
  webpackConfig.module.loaders.filter((loader) =>
    loader.loaders && loader.loaders.find((name) => /css/.test(name.split('?')[0]))
  ).forEach((loader) => {
    const first = loader.loaders[0]
    const rest = loader.loaders.slice(1)
    loader.loader = ExtractTextPlugin.extract(first, rest.join('!'))
    delete loader.loaders
  })

  webpackConfig.plugins.push(
    new ExtractTextPlugin('[name].[contenthash].css', {
      allChunks: true
    })
  )
}

module.exports = webpackConfig
