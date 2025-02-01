const path = require('path');

module.exports = {
  // その他の設定
  resolve: {
    alias: {
      // `node:` モジュールを処理するために
      buffer: require.resolve('buffer/'),
    },
    extensions: ['.js', '.ts', '.jsx', '.tsx'],
    fallback: {
      // node モジュールに対して fallback を追加
      "node-fetch": require.resolve("node-fetch"),
      "buffer": require.resolve("buffer/")
    }
  },
  plugins: [
    // 他のプラグイン設定があればここに追加
  ]
};
