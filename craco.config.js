const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "@primary-color": "#049391",
              "@table-row-hover-bg": "#F5F3F3",

            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
