module.exports = {
    // bundle all the modules inside ./src/index.js to a bundle.js file
    entry: './src/index.js',
    output: {
        path: __dirname + '/public',
        filename: 'bundle.js'
    },
    module: {
        // run babel-loader on every .js file
        // babel-loader transforms the non-standard JS (JSX, ES6) to standard JS
        loaders: [
        {
            test: /\.js$/,
            loader: 'babel-loader'
        }
        ]
    }
};