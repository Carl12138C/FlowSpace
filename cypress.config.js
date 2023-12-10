const { defineConfig } = require("cypress");

module.exports = defineConfig({
  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
  projectId: "ibd4ye",
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
