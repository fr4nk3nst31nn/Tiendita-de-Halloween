import React from 'react';

jest.mock('react-dom/client', () => ({
  createRoot: jest.fn(() => ({ render: jest.fn() })),
}));

describe('index.js bootstrap', () => {
  it('crea el root y renderiza la app', () => {
    document.body.innerHTML = '<div id="root"></div>';
    const { createRoot } = require('react-dom/client');
    require('../index');
    expect(createRoot).toHaveBeenCalled();
  });
});


