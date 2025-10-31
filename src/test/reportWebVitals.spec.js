it('se ejecuta sin error cuando no se pasa callback', () => {
  const reportWebVitals = require('../reportWebVitals').default;
  expect(() => reportWebVitals()).not.toThrow();
});


