/* eslint-disable @typescript-eslint/no-var-requires */
// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const ESLintWebpackPlugin = require('eslint-webpack-plugin');
const WebpackBuildeAnalyserPlugin = require('webpack-bundle-analyzer')["BundleAnalyzerPlugin"];
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

require('dotenv').config();

/* eslint-enable @typescript-eslint/no-var-requires */

const isProduction = process.env.NODE_ENV === 'production';

const stylesHandler = isProduction ? MiniCssExtractPlugin.loader : 'style-loader';

const config = {
	entry: './src/main.ts',
	mode: isProduction ? "production" : "development",
	output: {
		path: path.resolve(__dirname, 'dist'),
	},
	devServer: {
		open: false,
		host: 'localhost',
		port: 3000,
		hot: true,
		liveReload: true,
		client: { progress: true },
		historyApiFallback: true,
	},
	devtool: 'eval-nosources-cheap-source-map',
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, 'src', 'template.html'),
			favicon: path.resolve(__dirname, 'src', 'typescript.svg'),
			filename: 'index.html',
			title: 'TicTacToe Game',
		}),

		// Add your plugins here
		new ESLintWebpackPlugin(),
		new WebpackBuildeAnalyserPlugin(),
		// Learn more about plugins from https://webpack.js.org/configuration/plugins/
	],
	module: {
		rules: [
			{
				test: /\.(ts|tsx)$/i,
				loader: 'ts-loader',
				exclude: ['/node_modules/'],
			},
			{
				test: /\.s[ac]ss$/i,
				use: [stylesHandler, 'css-loader', 'postcss-loader', 'sass-loader'],
			},
			{
				test: /\.css$/i,
				use: [stylesHandler, 'css-loader', 'postcss-loader'],
			},
			{
				test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
				type: 'asset',
			},

			// Add your rules for custom modules here
			// Learn more about loaders from https://webpack.js.org/loaders/
		],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.jsx', '.js', '...'],
	},
	optimization: {
		runtimeChunk: 'single',
		chunkIds: 'named',
		removeEmptyChunks: true,
		mergeDuplicateChunks: true,
		splitChunks: {
			chunks: 'all',
			minSize: 20000,
		},

		minimize: true,
		minimizer: [new CssMinimizerPlugin(), '...'],
	},
};

module.exports = () => {
	if (isProduction) {
		config.mode = 'production';

		config.plugins.push(new MiniCssExtractPlugin());

		config.plugins.push(new WorkboxWebpackPlugin.GenerateSW());
	} else {
		config.mode = 'development';
	}
	return config;
};
