// CRACO config: works around react-scripts 5 (webpack 5) refusing to resolve
// MUI v9's ESM (.mjs) build, which imports `react-transition-group/...` without
// a file extension. Webpack enforces `fullySpecified` on ESM origins and won't
// auto-append `.js`, so the build fails. Relaxing it for .mjs/.js restores CRA's
// pre-webpack-5 resolution behavior.
module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.module.rules.push({
        test: /\.m?js$/,
        resolve: { fullySpecified: false },
      });

      // CRA's default ForkTsCheckerWebpackPlugin memoryLimit (2048 MB) is too
      // low for this dependency tree and the type-check worker gets SIGABRT'd.
      // Bump it so type errors are actually reported during the build.
      const tsChecker = webpackConfig.plugins.find(
        (p) => p.constructor.name === 'ForkTsCheckerWebpackPlugin',
      );
      if (tsChecker) {
        tsChecker.options.typescript = {
          ...tsChecker.options.typescript,
          memoryLimit: 4096,
        };
      }

      return webpackConfig;
    },
  },
};