const path = require('path');
const config = require('./webpack.common.config');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const CopyPlugin = require('copy-webpack-plugin');
const YuzuDist = require('./plugins/YuzuDist');

config.mode = 'production';
process.env.NODE_ENV = 'production';

config.output.filename = './_client/script/[name].[contenthash].js';

config.plugins.push(
    new MiniCssExtractPlugin({
        filename: './_client/style/[name].[contenthash].css'
    }),
    new MiniCssExtractPlugin({
        filename: './_client/style/[name].css'
    }),
    new YuzuDist()
);

module.exports = config;