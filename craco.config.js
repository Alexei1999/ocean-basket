// craco.config.js
const path = require(`path`);

const getAliases = (prefix = `src`) => ({
  "@src": `${prefix}`,
  "@app": `${prefix}/app`,
  "@molecules": `${prefix}/entities`,
  "@organisms": `${prefix}/features`,
  "@templates": `${prefix}/pages`,
  "@shared": `${prefix}/shared`,
  "@widgets": `${prefix}/widgets`,
});

const aliases = getAliases(`src`);

const resolvedAliases = Object.fromEntries(
  Object.entries(aliases).map(([key, value]) => [
    key,
    path.resolve(__dirname, value),
  ])
);

module.exports = {
  plugins: [
    {
      plugin: require("craco-alias"),
      options: {
        source: "tsconfig",
        baseUrl: "./src",
        tsConfigPath: "./tsconfig.paths.json",
      },
    },
  ],
  webpack: {
    alias: resolvedAliases,
  },
  style: {
    postcss: {
      plugins: [require("tailwindcss"), require("autoprefixer")],
    },
  },
};
