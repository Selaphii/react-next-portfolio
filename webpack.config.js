const path = require('path');

module.exports = {
  resolve: {
    alias: {
      buffer: require.resolve('buffer/'),
    },
    extensions: ['.js', '.ts', '.jsx', '.tsx'],
    fallback: {
      "node-fetch": require.resolve("node-fetch"),
      "buffer": require.resolve("buffer/")
    }
  },
  plugins: [
  ]
};
