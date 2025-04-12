declare module "expect" {
  interface AsymmetricMatchers {
    hasStatus: (expected: number) => void;
    hasBody: (expected: unknown) => Promise<void>;
  }
  interface Matchers<R> {
    toBeWithinRange(floor: number, ceiling: number): R;

    hasStatus: (expected: number) => R;
    hasBody: (expected: unknown) => Promise<R>;
  }
}

export {};
