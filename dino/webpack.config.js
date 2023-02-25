const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InterpolateHtmlPlugin = require('interpolate-html-plugin')

module.exports = {
  externals: {
    "react": "React",
    "react-dom": "ReactDOM",
},
    mode: 'none',
    entry: {
        app: path.join(__dirname, 'src', 'index.js')
    },
    target: 'web',
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    
    module: {
  
        rules: [
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader",
                  options: {
                    presets: [
                      "@babel/preset-env",
                      "@babel/preset-react",
                      "@babel/preset-typescript",
                    ],
                  },
                },
            },{
                test: /\.s[ac]ss$/i,
                use: [
                  // Creates `style` nodes from JS strings
                  "style-loader",
                  // Translates CSS into CommonJS
                  "css-loader",
                  // Compiles Sass to CSS
                  "sass-loader",
                ],
            },{
                test: /\.(jpe?g|png|gif|svg)$/i, 
                loader: 'file-loader',
                options: {
                  name: '/public/icons/[name].[ext]'
                }
            },  {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
              },
              { test: /\.txt$/, 
                use: ['raw-loader'] 
              },
              { test: /\.html$/, 
                use: ['html-loader'] 
              },
              {
                test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
                exclude: /node_modules/,
                use: ['file-loader?name=[name].[ext]'] // ?name=[name].[ext] is only necessary to preserve the original file name
              }
            
        ]
    },
    output: {
      path: path.join(__dirname, 'dist'),
      filename: "[name].js",
      sourceMapFilename: "[name].js.map"
    },
    devtool: "source-map",
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'public', 'index.html')
        }),
        new InterpolateHtmlPlugin({
            PUBLIC_URL: 'static' // can modify `static` to another name or get it from `process`
        }),
    ]
    
}
