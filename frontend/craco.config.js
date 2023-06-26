module.exports={
  webpack: {
    configure: {
      resolve: {
        fallback: {
          // Webpack 5, used in react-script v5, dropped support for built in node polyfills.
          // CRACO is being used to add these polyfills back into the webpack config until they are not needed.
          crypto: require.resolve("crypto-browserify"),
          stream: require.resolve("stream-browserify"),
        }
      }
    },
  },
};