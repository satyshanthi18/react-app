module.exports = {
  testEnvironment: "node",
  testEnvironmentOptions: {
    NODE_ENV: "test",
  },
  restoreMocks: true,
  coveragePathIgnorePatterns: [
    "node_modules",
    "configs/config",
    "index.js",
    "tests",
  ],
  coverageReporters: ["text", "lcov", "clover", "html"],
};
