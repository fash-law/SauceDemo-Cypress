const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    defaultCommandTimeout: 30000,
    specPattern: "cypress/e2e/**/*.{js, jsx, ts, tsx, feature}",
    baseUrl: "https://www.saucedemo.com/", // Replace with your base URL
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'cypress/reports',
      overwrite: true,
      html: true,
      json: true
    },

    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  // retries: {
  //   experimentalStrategy: 'detect-flake-and-pass-on-threshold',
  //   experimentalOptions: {
  //     maxRetries: 3,
  //     passesRequired: 1,
  //   },
  //   openMode: true,
  //   runMode: true,
  // },

});
