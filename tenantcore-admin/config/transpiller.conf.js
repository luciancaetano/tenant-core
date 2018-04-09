const paths = require('./paths');

let Babel = {
    compiller: {
        test: /\.(js|jsx)$/,
        include: paths.appSrc,
        loader: require.resolve('babel-loader'),
        options: {
            compact: true,
            cacheDirectory: true,
            plugins: ['transform-decorators-legacy']
        }
    },
    extensions: ['.web.js', '.js', '.json', '.web.jsx', '.jsx'],
    entry: 'src/index.js'
};

module.exports = Babel;
