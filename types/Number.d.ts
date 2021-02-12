declare global {
  interface NumberConstructor {
    isNumber(n: number): boolean,
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
