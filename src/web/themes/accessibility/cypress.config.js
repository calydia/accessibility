/*
  Environment variables:
  - CYPRESS_BASE_URL
  - CYPRESS_DRUPAL_USERNAME
  - CYPRESS_DRUPAL_PASSWORD
*/

const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {},
    baseUrl: 'https://accessibility.ddev.site',
    env: {
      DRUPAL_USERNAME: 'testuser',
      DRUPAL_PASSWORD: 'testpassword'
    }
  }
});
