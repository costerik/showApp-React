const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');  //this is required for HMR
const path = require('path');
const WebpackDevServer = require('webpack-dev-server');

const isProd = process.env.ENV === 'prod' ? true : false;
const cssDev = [ "style-loader","css-loader"];
const cssProd = ExtractTextPlugin.extract({   //HMR doesnt work with ExtractTextPlugin
                    fallback: "style-loader",
                    use: "css-loader",
                    publicPath: "/dist"
                });
const scssDev = ["style-loader", "css-loader", "sass-loader"];
const scssProd = ExtractTextPlugin.extract({   //HMR doesnt work with ExtractTextPlugin
  fallback: "style-loader",
  use: ["css-loader", "sass-loader"],
  publicPath: "/dist"
});

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry:{ 
        app: './src/app.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js', //[name] refer to properties on entry object
        publicPath: '/'
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use: isProd ? cssProd : cssDev,
            },
            {
                test: /\.scss$/,
                use: isProd ? scssProd : scssDev
            },
            {
                test:/\.js$/,
                exclude: /node_module/,
                use: "babel-loader"
            },
            {
                test:/\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                exclude: /node_module/,
                use: [
                    "file-loader?name=[name].[ext]&outputPath=images/",
                    "image-webpack-loader" //Optimize images befores load
                ]
            }
        ]
    },
    devServer:{
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        //port: 9000,
        stats: "errors-only",
        historyApiFallback: { disableDotRule: true },
        hot: true, //enable hot module replacement(HMR),
        stats: { colors: true }
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Fullstack Labs',
           //minify:{
           // collapseWhitespace: true
           // },
            hash: true,
            template: "./src/index.html"
        }),
        new ExtractTextPlugin({
            filename: "app.bundle.css",
            disable: !isProd, //This flag must be true with HMR
            allChunks: true  
        }),
        new webpack.HotModuleReplacementPlugin(), // this two modules allow HMR
        new webpack.NamedModulesPlugin()           //
    ],
    externals: {
        cheerio: 'window',
        'react/addons': 'react',
        'react/lib/ExecutionEnvironment': 'react',
        'react/lib/ReactContext': 'react',
      }
}