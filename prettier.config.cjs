/** @type {import("prettier").Config} */
const config = {
  plugins: [require.resolve("prettier-plugin-tailwindcss")],
  tabWidth: 2,
  useTabs: false,
  bracketSpacing: true,
  bracketSameLine: true,
  jsxSingleQuote: true,
  singleQuote: true,
};

module.exports = config;
