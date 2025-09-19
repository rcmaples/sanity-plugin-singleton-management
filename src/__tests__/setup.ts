import "@testing-library/jest-dom";

// Mock console methods to reduce noise in tests
global.console = {
  ...console,
  // Uncomment these to hide logs during tests
  // log: vi.fn(),
  // warn: vi.fn(),
  // error: vi.fn(),
};
