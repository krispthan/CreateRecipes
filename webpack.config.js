const path = require('path');//include built in node module
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry:['babel-polyfill', './starter/src/js/index.js'],
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'js/bundle.js'
    },
    devServer:{
        contentBase:'./dist'
    },
    plugins:[
        new HtmlWebpackPlugin({
            filename:'index.html',
            template:'./starter/src/js/index.html'
        })
    ],
    module:{
        rules:[
            {
                test:/\.js$/,
                exclude: /node_modules/,
                use:{
                    loader:'babel-loader'
                }
            }
        ]
    }

}