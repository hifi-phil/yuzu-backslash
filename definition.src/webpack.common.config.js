const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWepackPlugin = require('html-webpack-plugin');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PrefixWrap = require("postcss-prefixwrap");

const CopyPlugin = require('copy-webpack-plugin');
const globImporter = require('node-sass-glob-importer');

const YuzuTemplatePaths = require('./plugins/YuzuTemplatePaths');

files = {
    templates: './_dev/_templates/',
    templateHTML: './_dev/_templates/'
}

paths = {
    images: {
        dest: './_dev/_source/images/',
    }
}

module.exports = {
    entry: {
        'yuzu': ['./_dev/yuzu.js'], 
        'websiteScripts': './_dev/_source/js/app.js',
        'frontendStyles': './_dev/_source/styles/scss/frontend.js',
        'backoffice': './_dev/_source/styles/scss/backoffice.js',
    },
    output: {
        filename: './_client/scripts/[name].js',
        path: path.resolve(__dirname, './dist/'),
        publicPath: '',        
    },
    mode: 'none',
    module: {
        rules: [
            {
                test: /\.(png|jpg|svg)$/,
                use: [
                    { 
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: './_client/images/'
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    {   
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '/'
                        }
                    },
                    'css-loader', 
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [PrefixWrap(".yuzu-back-office", {
                                        whitelist: ["backoffice.scss"],
                                    })],
                                ],
                            },
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sassOptions: {
                                importer: globImporter()
                            }
                        }
                    }
                ]
            },
            {
                type: 'javascript/auto',
                test: /\.json$/,
                use: [
                    'html-loader',
                    {
                        loader: path.resolve(__dirname, './loaders/yuzu-loader.js')
                    }
                ]
            }
        ]
    }, 
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWepackPlugin({
            title: 'Yuzu Pattern Library',
            chunks: ['websiteScripts', 'frontendStyles', 'yuzu'],
            template: './_dev/page-template.html',
            filename: 'yuzu.html'
        }),
        new CopyPlugin({
            patterns: [
                {
                    context: path.resolve(__dirname, '_dev', 'yuzu-def-ui'),
                    from: '**/*',
                    to: 'yuzu-def-ui'
                }
            ]
        }),
        new CopyPlugin({
            patterns: [
                {
                    context: path.resolve(__dirname, '_dev', '_source', 'images'),
                    from: '**/*',
                    to: path.resolve(__dirname, 'dist', '_client', 'images')
                }
            ]
        }),
        new YuzuTemplatePaths()
    ]
}