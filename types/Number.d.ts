declare global {
  interface NumberConstructor {
    isNumber<T = unknown>(n: T): boolean,
    isNegativeZero(n: number): boolean,
    isInteger(n: number): boolean,
    isNatural(n: number): boolean,
    isFloat(n: number): boolean
  }

  interface Number {
    pad(padding: number): string
  }
}

export { };
