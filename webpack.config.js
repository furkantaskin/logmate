const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
    entry: {
        extensions: './src/extensions.ts',
        scripts: './src/scripts.ts',
        background: './src/background.ts'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist/js/'),
    },
    plugins: [
        new Dotenv()
    ]
};