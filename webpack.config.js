/* eslint-disable */
const dev = process.env.NODE_ENV !== "production";
const webpack = require( "webpack" );
const path = require( "path" );
const { BundleAnalyzerPlugin } = require( "webpack-bundle-analyzer" );
const ExtractTextPlugin = require( "extract-text-webpack-plugin" );

const plugins = [
    new webpack.optimize.CommonsChunkPlugin( {
        name: "lib",
        minChunks: Infinity,
        filename: "[name].bundle.js",
    } ),
    new ExtractTextPlugin( {
        filename: "[name].bundle.css",
    } ),
];

if ( !dev ) {
    plugins.push(
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.DefinePlugin( {
            "process.env.NODE_ENV": JSON.stringify( "production" ),
        } ),
        new webpack.optimize.UglifyJsPlugin( { mangle: false, sourceMap: true } ),
        new BundleAnalyzerPlugin( {
            analyzerMode: "static",
            reportFilename: "webpack-report.html",
            openAnalyzer: false,
        } )
    );
}

module.exports = {
    context: path.join( __dirname, "src" ),
    devtool: dev ? "none" : "source-map",
    entry: {
        app: "./js/App.js",
        lib: [ "react", "react-dom" ],
    },
    resolve: {
        modules: [
            path.resolve( "./src" ),
            "node_modules",
        ],
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                enforce: "pre",
                exclude: /(node_modules|bower_components)/,
                use: [
                    {
                        loader: "eslint-loader",
                        options: {
                            failOnWarning: false,
                            failOnError: true,
                        },
                    },
                ],
            },
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: "babel-loader",
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract( {
                    use: [ {
                        loader: "css-loader",
                        options: {
                            url: false,
                            autoprefixer: false,
                            minimize: true,
                        // sourceMap: true
                        },
                    }, {
                        loader: "postcss-loader",
                        options: {
                        // sourceMap: true
                        },
                    }, {
                        loader: "sass-loader",
                        options: {
                        // sourceMap: true,
                            includePaths: [ "styles" ],
                        },
                    },
                    ],
                    fallback: "style-loader",
                } ),
            },
        ],
    },
    output: {
        path: path.resolve( __dirname, "dist" ),
        filename: "[name].bundle.js",
    },
    plugins,
};
