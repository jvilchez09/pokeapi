module.exports = {
  transpileDependencies: ["vuetify"],
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "Pokédex";
      return args;
    });
  },
};

module.exports = {
  pages: {
    index: {
      // entry for the page
      entry: "src/main.js",
      title: "Pokédex",
    },
  },
};
