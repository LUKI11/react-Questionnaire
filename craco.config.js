module.exports = {
  // define proxy
  devServer: {
    proxy: {
      '/api': 'http://localhost:3001',
    },
  },
};
