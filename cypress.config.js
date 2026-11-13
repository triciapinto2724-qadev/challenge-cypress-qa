const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://with-bugs.practicesoftwaretesting.com',
    viewportWidth: 1280,
    viewportHeight: 900,

    env: {
      apiUrl: 'https://api-with-bugs.practicesoftwaretesting.com',

      // Mantiene el formato de navegación del ejemplo que compartiste.
      // Si al navegar manualmente el sitio usa /auth/login sin #,
      // cambiar este valor a false.
      useHashRouting: true,
    },

    setupNodeEvents(on, config) {
      return config
    },
  },
})