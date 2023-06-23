module.exports = {
    mode: 'development',
    devtool: "source-map",
    entry: './index.js',
    output: {
        filename: './anim.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader'
                    }
                ]
            },
        ]
    }
}