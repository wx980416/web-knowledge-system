const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { DefinePlugin } = require('webpack')
const CopyWebpackPluin = require('copy-webpack-plugin')

module.exports = {
  // 配置入口
  entry: './src/main.js',
  // 配置出口
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './build'),
    // assetModuleFilename:'img/[name].[hash:6][ext]'
  },
  module: {
    // loader配置
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          // {
          //   loader: 'postcss-loader',
          //   options: {
          //     postcssOptions: {
          //       plugins: [require('autoprefixer')],
          //       plugins: [require('postcss-preset-env')],
          //     },
          //   },
          // },
        ],
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader'],
      },
      // {
      //   test:/\.(png|jpe?g|gif|svg)$/i,
      //   type:"asset/resource",
      //   generator:{
      //     filename:"img/[name].[hash:3][ext]"
      //   }
      // },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset',
        generator: {
          filename: 'img/[name].[hash:6][ext]',
        },
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024,
          },
        },
      },
      {
        test: /\.(woff2?|eot|ttf)$/,
        type: 'asset/resource',
        generator: {
          filename: 'font/[name].[hash:6][ext]',
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'webpack项目测试',
      template: './public/index.html',
    }),
    new DefinePlugin({
      BASE_URL: '"./"',
    }),
    new CopyWebpackPluin({
      patterns: [
        {
          from: 'public',
          globOptions: {
            ignore: ['**/index.html', '**/abc.txt'],
          },
        },
      ],
    }),
  ],
}
