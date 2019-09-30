// webpack.config.js
module.exports = {
    entry: './src/containers/frontend/other/index.js',
    output: {      
		path: path.join(__dirname, "dist"),
		filename: "account-kit.js",
		libraryTarget: "umd",
		library: "AccountKit"
    },
    module: {
        loaders: [
            {
                loader: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/
            }
        ]
    },
    devServer: {
        port: 3000
    },
    externals: {
        config: JSON.stringify({
            apiUrl: 'http://salentro.quicquik.com/webservices/2cents/'
        })
    }
};
