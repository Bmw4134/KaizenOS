module.exports = {
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.js',
    maxConcurrency: 1,
    maxThreads: 1,
    isolate: true,
  },
};
